import json
import requests
from django.http import HttpResponse
from langchain_community.document_loaders import PyPDFLoader
from .models import Paper, Literature, Person
from .serializers import serialize_object, deserialize_paper
from .metadataExtraction import processPaper
from .deriveInformation import deriveInformation
from io import BytesIO
from .constants import pocketbaseCollectionURL, pocketbaseFileURL, header, filePath
from django.views.decorators.csrf import csrf_exempt

# Function to test the llm output
def testLLM(request):
    paper = Paper(title="Test", date="10.10.2024")
    return HttpResponse(processPaper(paper), status=200)

# Function to the database connection
def testDatabaseWriting(request):
    #testLiterature = Literature(title='test3', authors='test3')
    #requests.post(url=pockebaseURL + '/literature/records/', headers=header, data=serialize_object(testLiterature))
    #jsonTemp = requests.get(url=pocketbaseCollectionURL + '/papers/records/huu6vcywul5m1hx').text
    """
    jsonTemp = requests.get(url=pocketbaseCollectionURL + '/person/records', params={'filter': 'name="Simon Ulmer"&&student_role="Project-Member"'}).text

    # Deserialize JSON into a Python dictionary
    data_dict = json.loads(jsonTemp)

    # Extract the 'items' part
    items = data_dict.get('items')

    if len(items) == 0:
        return HttpResponse('Test', status=200)

    first_dict = items[0]

    # Get the value of the 'collectionId' key from the first dictionary
    collection_id = first_dict['collectionId']

    return HttpResponse(collection_id, status=200)

    itemsDicts = json.loads(items)

    # Filter out keys not present in the class constructor
    filtered_data = {key: value for key, value in itemsDicts.items() if key in Person.__init__.__code__.co_varnames}

    # Map 'collectionId' to 'id'
    filtered_data['id'] = itemsDicts.pop('collectionId')

    paper = Person(**filtered_data)
    return HttpResponse(serialize_object(paper), status=200)

    name = "Hallo h"
    role = "Student"
    # Make http request to get the person
    jsonTemp = requests.get(url=pocketbaseCollectionURL + '/literature/records', params={'filter': f'title="{name}"'}).text

    # Deserialize JSON into a Python dictionary
    dataDict = json.loads(jsonTemp)

    # Extract the 'items' part
    items = dataDict.get('items')

    # Check if the items part is empty -> create the person
    if len(items) == 0:
        newLiterature = Literature(title=name)
        response = requests.post(url=pocketbaseCollectionURL + '/literature/records/', headers=header, data=serialize_object(newLiterature)).text
        jsonTemp = json.loads(response)
        return HttpResponse(jsonTemp.get('id'), status=200)

    # Convert the list into a dictionary
    dict = items[0]

    # Get the value of the 'collectionId' key from the dictionary
    return HttpResponse(dict['id'], status=200)
    """
    # Load the object and the pdf file from the pocketbase database
    response = requests.get(url=pocketbaseCollectionURL + '/papers/records/kb02zxe89jalyrj')


    # Check if the get request was successful
    if response.status_code == 200:
        jsonData = response.text

        data = json.loads(jsonData)

        # Deserialize the json data
        paper = deserialize_paper(jsonData)

        # todo Load the pdf file from the file server
        documentName = paper.document

        fileResponse = requests.get(url=pocketbaseFileURL + '/papers/kb02zxe89jalyrj/' + documentName + '?download=1')

        pdfData = BytesIO(fileResponse.content)

        with open(filePath, "wb") as pdf_file:
            pdf_file.write(pdfData.getvalue())

        loader = PyPDFLoader(filePath)
        pdfFile = loader.load()

        return HttpResponse(len(pdfFile), status=200)

# Function to process an updated paper
@csrf_exempt
def updatePaper(request):
    if request.method == 'POST':
        # Get the id for the database object
        id = request.POST.get('id')

        # Load the object and the pdf file from the pocketbase database
        response = requests.get(url=pocketbaseCollectionURL + '/papers/records/' + id)

        # Check if the get request was successful
        if response.status_code == 200:
            jsonData = response.text

            # Deserialize the json data
            paper = deserialize_paper(jsonData)

            #todo Derive information from paper metadata
            #paper = deriveInformation(paper=paper)

            # Store updated paper in database
            requests.patch(url=pocketbaseCollectionURL + '/papers/records/' + id, headers=header, data=serialize_object(paper))

            # Send back status report to frontend
            return HttpResponse(status=200)
        else:
            return HttpResponse('Corresponding paper not found in the database', status=400)

# Function to process an uploaded paper
@csrf_exempt
def uploadPaper(request):
    if request.method == 'POST':
        # Get the id for the database object
        id = request.POST.get('id')

        # Load the object and the pdf file from the pocketbase database
        response = requests.get(url=pocketbaseCollectionURL + '/papers/records/' + id)

        # Check if the get request was successful
        if response.status_code == 200:
            jsonData = response.text

            # Deserialize the json data
            paper = deserialize_paper(jsonData)

            # Load the pdf file from the file server
            documentName = paper.document
            fileResponse = requests.get(url=pocketbaseFileURL + '/papers/' + id + '/' + documentName + '?download=1')

            if fileResponse.status_code == 200:
                pdfData = BytesIO(fileResponse.content)

                # Save the PDF data to a file
                with open(filePath, "wb") as f:
                    f.write(pdfData.getvalue())

                # Interact with LLM
                paper = processPaper(paper=paper, path=filePath)

                #todo Derive information from paper metadata
                #paper = deriveInformation(paper=paper)

                # Store updated paper in database
                #todo Not all data gets correctly imported into database
                requests.patch(url=pocketbaseCollectionURL + '/papers/records/' + id, headers=header, data=serialize_object(paper))

                # Send back status report to frontend
                return HttpResponse(status=200)
            else:
                return HttpResponse('Corresponding pdf file not found in the database', status=400)
        else:
            return HttpResponse('Corresponding paper not found in the database', status=400)