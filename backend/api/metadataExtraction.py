import json
import requests
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import OllamaEmbeddings
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOllama
from .constants import pocketbaseCollectionURL, studentCONST, supervisorCONST, projectPartnerCONST, header
from .models import Paper, Person, Literature
from .serializers import serialize_object, deserialize_paper, deserialize_person, deserialize_literature

# Function to process a pdf file
def processPaper(paper, path):
    # Load paper
    loader = PyPDFLoader(path)

    pdfFile = loader.load()

    # Extract te first 5 pages for the metadata extraction - all the important information metadata should be within the first 5 pages
    firstPages = pdfFile[:5]

    # Find the literature source
    index = find_references(pdfFile)

    # Extract the references
    literature = pdfFile[index:]

    # Extract pages relevant for word count - exclude references
    textWithoutLiterature = pdfFile[:index]

    textSplitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    splits = textSplitter.split_documents(firstPages)

    # Create Ollama embeddings and vectore store
    embeddings = OllamaEmbeddings(model='nomic-embed-text')
    vectorstore = Chroma.from_documents(documents=splits, embedding=embeddings)

    # Create question for metadata extraction
    question = 'Extract me the title, submission_date, authors, project_partner (if available - else leave empty), supervisors (remove all titles), language, abstract (if no such chapter available - leave empty), methodology (if not available - leave empty), course - in json format. Do not invent anything and stick to the facts in the context'

    # Create retriever and make the RAG setup
    retriever = vectorstore.as_retriever()

    llm = ChatOllama(
        temperature=0,
        model='llama3',
        streaming=True,
        top_k=10,
        top_p=0.3,
        num_ctx=3072,
        verbose=False
    )

    # Create the chain
    chain = RetrievalQA.from_llm(
        llm=llm,
        retriever=retriever
    )

    # Call Ollama Llama3 model
    response = chain.invoke({'query': question})

    # Do something with the output and return it
    jsonMetadata = extract_json(response['result'])

    # Extract metadata from json
    paper.title = jsonMetadata['title']
    paper.date = jsonMetadata['submission_date']
    paper.project_partner = jsonMetadata['project_partner']
    paper.language = jsonMetadata['language']
    paper.abstract = jsonMetadata['abstract']
    paper.methodology = jsonMetadata['methodology']

    # Check for course
    paper.course = check_course(jsonMetadata['course'])

    # Search for supervisors
    supervisorIDs = []
    for supervisor in jsonMetadata["supervisors"]:
        id = handle_person(supervisor, supervisorCONST)
        supervisorIDs.append(id)

    paper.supervisors = supervisorIDs

    # Search for authors
    authorIDs = []
    for author in jsonMetadata["authors"]:
        id = handle_person(author, studentCONST)
        authorIDs.append(id)

    paper.authors = authorIDs

    # Handle literature
    #todo Not every resource gets extracted - fix this
    splits = textSplitter.split_documents(literature)

    # Create Ollama embeddings and vectore store
    embeddings = OllamaEmbeddings(model='nomic-embed-text')
    vectorstore = Chroma.from_documents(documents=splits, embedding=embeddings)

    # Create question for metadata extraction
    question = 'Extract me the title, date, authors, doi (if not available - leave empty), url (if not available - leave empty) - in json format. Do not invent anything and stick to the facts in the context'

    # Create retriever and make the RAG setup
    retriever = vectorstore.as_retriever()

    # Create the chain
    chain = RetrievalQA.from_llm(
        llm=llm,
        retriever=retriever
    )

    # Call Ollama Llama3 model
    response = chain.invoke({'query': question})

    # Extract literature objects from response
    literatureObjects = extract_literature_objects(response['result'])

    # Search for literature
    literatureIDs = []
    for l in literatureObjects:
        id = handle_literature(l)
        literatureIDs.append(id)

    paper.literature = literatureIDs

    # Get the number of pages of the pdf file - pdf loader generates a document for each page and stores it into a list -> therefore extract page count with function len()
    paper.pages = len(pdfFile)

    # Get the number of words of the pdf file - without the references
    paper.word_count = calculate_word_count(textWithoutLiterature)

    return paper

# Function to find the references in the pdf file
def find_references(pdfFile):
    for i, page in enumerate(pdfFile):
        text = page.page_content
        lowercaseText = text.lower()

        # Check if the first 40 characters include a number, a point, "Literaturverzeichnis", "Literature", or "References",
        # and a newline character '\n' with optional spaces in between
        if any([char.isdigit() for char in lowercaseText[:40]]) and \
                ("literaturverzeichnis" in lowercaseText[:40] or "literature" in lowercaseText[:40] or "references" in lowercaseText[:40]) and \
                "\n" in lowercaseText[:40]:
            return i

    # Return 5 if no such index is found - just use everything after the metadata pages
    return 5

# Function to calculate the word count
def calculate_word_count(pdfFile):
    word_count = 0
    for page in pdfFile:
        text = page.page_content
        words = text.split()  # Split text into words
        word_count += len(words)   # Add the number of words

    return word_count

# Function to extract json objects from the llm response for the metadata
def extract_json(text):
    # Find the start and end indices of the JSON portion
    startIndex = text.find('{')
    endIndex = text.rfind('}') + 1

    # Extract the JSON portion
    json_data = text[startIndex:endIndex]

    # Parse the JSON data
    return json.loads(json_data)

# Function to extract literature objects form the llm response
def extract_literature_objects(text):
    startIndex = text.find('[')
    endIndex = text.rfind(']') + 1

    # Extract the JSON portion
    jsonData = text[startIndex:endIndex]

    # Parse the JSON string into a Python object (list of dictionaries)
    literatureData = json.loads(jsonData)

    # Create instances of the Literature class for each dictionary in the list
    literatureObjects = []
    for item in literatureData:
        literature_object = Literature(
            title=item['title'],
            authors=item['authors'],
            date=item['date'],
            doi=item['doi'],
            url=item['url']
        )
        literatureObjects.append(literature_object)

    return literatureObjects

# Function to check if a person is already present in the database - if not create it - and return their id
def handle_person(name, personType):
    # Make http request to get the person
    jsonTemp = requests.get(url=pocketbaseCollectionURL + '/person/records', params={'filter': f'name="{name}"&&person_type="{personType}"'}).text

    # Deserialize JSON into a Python dictionary
    dataDict = json.loads(jsonTemp)

    # Extract the 'items' part
    items = dataDict.get('items')

    # Check if the items part is empty -> create the person
    if len(items) == 0:
        newPerson = Person(name=name, person_type=personType)
        response = requests.post(url=pocketbaseCollectionURL + '/person/records/', headers=header, data=serialize_object(newPerson)).text
        dict = json.loads(response)
        return dict.get('id')

    # Convert the list into a dictionary
    dict = items[0]

    # Get the value of the 'id' key from the dictionary
    return dict['id']

# Function to check if the source paper is already present in the database - if not create it - and return their id
def handle_literature(literature):
    # Make http request to get the person
    jsonTemp = requests.get(url=pocketbaseCollectionURL + '/literature/records', params={'filter': f'title="{literature.title}"'}).text

    # Deserialize JSON into a Python dictionary
    dataDict = json.loads(jsonTemp)

    # Extract the 'items' part
    items = dataDict.get('items')

    # Check if the items part is empty -> create the literature
    if len(items) == 0:
        response = requests.post(url=pocketbaseCollectionURL + '/literature/records/', headers=header, data=serialize_object(literature)).text
        dict = json.loads(response)
        return dict.get('id')

    # Convert the list into a dictionary
    dict = items[0]

    # Get the value of the 'id' key from the dictionary
    return dict['id']

# Function to check the course
def check_course(course):
    course = course.replace('-', ' ').lower()

    if course in 'it projekt' or course in 'it project':
        return 'PJ IT-Projekt Wirtschaftsinformatik'

    if course in 'ps information engineering':
        return 'PS Information Engineering & Management'

    if course in 'se information engineering &':
        return 'SE Information Engineering & Management'

    if course in 'se information engineering':
        return 'SE Information Engineering'

    if course in 'se seminar in':
        return 'SE Seminar in Planung und Gestaltung der Digitalisierung'

    return None