import requests
import json
from django.http import HttpResponse
from .models import Paper, Literature, Person
from .serializers import serialize_object, deserialize_paper
from .metadataExtraction import processPaper
from .deriveInformation import deriveInformation
from io import BytesIO

# Constants
pocketbaseCollectionURL = 'http://127.0.0.1:8090/api/collections'
pocketbaseFileURL = 'http://127.0.0.1:8090/api/files'
header = {"Content-Type": "application/json"}

# Function to test the llm output
def testLLM(request):
    paper = Paper(title="Test", date="10.10.2024")
    return HttpResponse(processPaper(paper), status=200)

# Function to the database connection
def testDatabaseWriting(request):
    #testLiterature = Literature(title='test3', authors='test3')
    #requests.post(url=pockebaseURL + '/literature/records/', headers=header, data=serialize_object(testLiterature))
    jsonTemp = requests.get(url=pocketbaseCollectionURL + '/papers/records/huu6vcywul5m1hx').text

    # Deserialize JSON into a Python dictionary
    data_dict = json.loads(jsonTemp)

    # Filter out keys not present in the class constructor
    filtered_data = {key: value for key, value in data_dict.items() if key in Paper.__init__.__code__.co_varnames}

    # Map 'collectionId' to 'id'
    filtered_data['id'] = data_dict.pop('collectionId')

    paper = Paper(**filtered_data)
    return HttpResponse(serialize_object(paper), status=200)

# Function to process an updated paper -
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
            requests.post(url=pocketbaseCollectionURL + '/papers/records/' + id, headers=header, data=serialize_object(paper))

            # Send back status report to frontend
            return HttpResponse(status=200)
        else:
            return HttpResponse('Corresponding paper not found in the database', status=400)

# Function to process an uploaded paper
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

            # todo Load the pdf file from the file server
            documentName = paper.document
            fileResponse = request.get(url=pocketbaseFileURL + '/papers/' + id + '/' + documentName)

            if fileResponse.status_code == 200:
                pdfData = BytesIO(fileResponse.content)

                # Save the PDF data to a file
                with open('received_file.pdf', 'wb') as f:
                    f.write(pdfData)

                #todo Interact with LLM
                paper = processPaper(pdfFile='received_file.pdf', paper=paper)

                #todo Derive information from paper metadata
                #paper = deriveInformation(paper=paper)

                #todo Store updated paper in database
                requests.post(url=pocketbaseCollectionURL + '/papers/records/' + id, headers=header, data=serialize_object(paper))

                # Send back status report to frontend
                return HttpResponse(status=200)
            else:
                return HttpResponse('Corresponding pdf file not found in the database', status=400)
        else:
            return HttpResponse('Corresponding paper not found in the database', status=400)