import requests
from django.http import HttpResponse
from django.utils import timezone
from .serializers import PaperSerializer
from .models import Paper
from .metadataExtraction import processPaper
from .deriveInformation import deriveInformation

# Constants
pockebaseURL = 'http://127.0.0.1:8090/'

# Function  to test the llm output
def testLLM(request):
    return HttpResponse(processPaper(), status=200)

# Function to process an updated paper -
def updatePaper(request):
    if request.method == 'POST':
        # Get the id for the database object
        id = request.POST.get('id')

        #todo Send http request to the pocketbase database
        # Load the object and the pdf file from the database
        paper = requests.get(url=pockebaseURL + 'api/papers/' + id)

        #todo Derive information from paper metadata
        deriveInformation(paper=paper)

        #todo Store updated paper in database
        requests.post(url=pockebaseURL + 'api/papers/' + id, data=paper)

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
        paper = requests.get(url=pockebaseURL + 'api/papers/'  + id)
        pdfFile = paper.pdfFile

        #todo Interact with LLM
        processPaper(pdfFile=pdfFile, paper=paper)

        #todo Derive information from paper metadata
        deriveInformation(paper=paper)

        #todo Store updated paper in database
        requests.post(url=pockebaseURL + 'api/papers/' + id, data=paper)

        return HttpResponse(status=200)
    else:
        return HttpResponse('Corresponding paper not found in the database', status=400)