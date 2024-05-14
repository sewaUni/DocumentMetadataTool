import json
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import OllamaEmbeddings
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOllama

# Function to process a pdf file
#Todo Add paper and pdf file to function parameters
def processPaper(paper):
    # Load paper
    #todo Load paper
    loader = PyPDFLoader(r'C:\Users\simon\Downloads\Legacy_Projekt_anonymisiert.pdf')

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
    paper.course = jsonMetadata['course']

    #todo Create persons

    # Search for supervisors

    # Search for authors

    #todo Create literature


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

def extract_json(text):
    # Find the start and end indices of the JSON portion
    startIndex = text.find('{')
    endIndex = text.rfind('}') + 1

    # Extract the JSON portion
    json_data = text[startIndex:endIndex]

    # Parse the JSON data
    return json.loads(json_data)