# See video here -> https://www.youtube.com/watch?v=O7RdEyRsatw
import ollama
import bs4
from langchain.text_splitter import RecursiveCharacterTextSplitter
#todo Determine best loader for the pdfs
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import OllamaEmbeddings
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

def processPaper():
    # Load paper
    #todo Load paper
    loader = PyPDFLoader(r'C:\Users\simon\OneDrive - Johannes Kepler Universität Linz\Dokumente\Studium\SE IE\DocumentMetadataTool\backend\title_page.pdf')

    pdfFile = loader.load()
    textSplitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    splits = textSplitter.split_documents(pdfFile)

    # Create Ollama embeddings and vectore store
    embeddings = OllamaEmbeddings(model='llama3')
    vectorstore = Chroma.from_documents(documents=splits, embedding=embeddings)

    # Create question to extract metadata
    #todo Create question for metadata extraction
    question = 'Extract me the supervisors of the project'

    # Call Ollama Llama3 model
    return runPrompt(question, vectorstore)

    #todo Do something with the output and return it

# Function for executing a prompt on the model
def runPrompt(question, context):
    # Create the prompt - and ensure that the llm stays within the context
    prompt = f"Question: {question}\n\nContext: {context}\n\nDo not invent anything and stick to the facts in the context"
    response = ollama.chat(model='llama3', messages=[{'role': 'user', 'content': prompt}])
    return response['message']['content']