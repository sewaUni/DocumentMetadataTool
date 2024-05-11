import requests
import json
from django.http import HttpResponse
from .models import Paper, Literature, Test
from .serializers import LiteratureSerializer
from .metadataExtraction import processPaper
from .deriveInformation import deriveInformation

# Constants
pockebaseURL = 'http://127.0.0.1:8090/api/collections'

def serialize_object(obj):
    """
    Serialize an object into JSON format.
    """
    return json.dumps(vars(obj))

# Function to test the llm output
def testLLM(request):
    return HttpResponse(processPaper(), status=200)

# Function to the database connection
def testDatabaseWriting(request):
    testLiterature = Test(title='test1', authors='test1')
    headers = {"Content-Type": "application/json"}
    requests.post(url=pockebaseURL + '/literature/records/', headers=headers, data=serialize_object(testLiterature))
    return HttpResponse(serialize_object(testLiterature), status=200)

# Function to process an updated paper -
def updatePaper(request):
    if request.method == 'POST':
        # Get the id for the database object
        id = request.POST.get('id')

        #todo Send http request to the pocketbase database
        # Load the object and the pdf file from the database
        paper = requests.get(url=pockebaseURL + '/papers/records/' + id)

        #todo Derive information from paper metadata
        deriveInformation(paper=paper)

        #todo Store updated paper in database
        requests.post(url=pockebaseURL + '/papers/records/' + id, data=paper)

        # Send back status report to frontend
        return HttpResponse(status=200)
    else:
        return HttpResponse('Corresponding paper not found in the database', status=400)


# Function to process an uploaded paper
def uploadPaper(request):
    if request.method == 'POST':
        # Get the id for the database object
        id = request.POST.get('id')

        #todo Send http request to the pocketbase database
        # Load the object and the pdf file from the database
        paper = requests.get(url=pockebaseURL + '/papers/records/' + id)
        pdfFile = paper.pdfFile

        #todo Interact with LLM
        processPaper(pdfFile=pdfFile, paper=paper)

        #todo Derive information from paper metadata
        deriveInformation(paper=paper)

        #todo Store updated paper in database
        requests.post(url=pockebaseURL + '/papers/records/' + id, data=paper)

        return HttpResponse(status=200)
    else:
        return HttpResponse('Corresponding paper not found in the database', status=400)