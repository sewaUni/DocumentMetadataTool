import ollama
import bs4
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import OllamaEmbeddings
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

def processPaper():
    # Load paper
    #todo Load paper
    loader = PyPDFLoader(r'C:\Users\simon\OneDrive - Johannes Kepler Universität Linz\Dokumente\Studium\Vorbei\Communications Engineering\PS\Seminar_paper_Ulmer_Simon_k12043331.pdf')

    pdfFile = loader.load()
    textSplitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    splits = textSplitter.split_documents(pdfFile)

    # Create Ollama embeddings and vectore store
    embeddings = OllamaEmbeddings(model='llama3')
    vectorstore = Chroma.from_documents(documents=splits, embedding=embeddings)

    # Create question to extract metadata
    #todo Create question for metadata extraction
    #todo Probably make several prompt questions
    question = 'Extract me the supervisors of the project - give me only the names splitted by ; and remove all titles'
    #question = 'Extract me the title, submission date, authors, project partner (if available), language, abstract, methodology, course, pages and the word count - in json format'

    # Create retriever and make the RAG setup
    retriever = vectorstore.as_retriever()
    retrievedDocs = retriever.invoke(question)
    formattedContext = combineDocs(retrievedDocs)

    # Call Ollama Llama3 model
    return runPrompt(question, formattedContext)

    #todo Do something with the output and return it
    #todo Create persons and literature - or look if they are already there?

# Function for executing a prompt on the model
def runPrompt(question, context):
    # Create the prompt - and ensure that the llm stays within the context
    prompt = f"Question: {question}\n\nContext: {context}\n\nDo not invent anything and stick to the facts in the context"
    response = ollama.chat(model='llama3', messages=[{'role': 'user', 'content': prompt}])
    return response['message']['content']

def combineDocs(docs):
    return "\n\n".join(doc.page_content for doc in docs)
