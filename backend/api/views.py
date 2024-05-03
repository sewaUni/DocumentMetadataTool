from django.shortcuts import render
from django.http import HttpResponse
from django.utils import timezone
from .serializers import PaperSerializer
from .models import Paper
# Create your views here.

# Function to get all papers
def getPapers(request):
    if request.method == 'GET':
        #todo Get all papers
        papers = Paper.objects.all()

        # Serialize the paper data
        serializer = PaperSerializer(papers, many=True)
        serializedPapers = serializer.data

        # Send back the serialized papers
        return HttpResponse(serializedPapers, status=200)
    else:
        return HttpResponse('No PDF file found', status=400)

# Function to change a paper
def updatePaper(request):
    if request.method == 'POST':
        #todo Update paper



        #todo Send back updated paper object
        return HttpResponse(status=200)
    else:
        return HttpResponse('Corresponding paper not found in the database', status=400)


# Function to get uploaded files
def uploadPaper(request):
    if request.method == 'POST' and request.FILES['paper']:
        # Get the relevant data from the post request
        pdfFile = request.FILES['paper']
        title = request.POST.get('title', 'Untitled')

        # Get the upload time
        uploadTime = timezone.now()

        # Store the model
        paper = Paper(title=title, pdfFile=pdfFile, date=uploadTime)
        paper.save()

        #todo Interact with LLM and send back metadata

        return HttpResponse(status=200)
    else:
        return HttpResponse('No PDF file found', status=400)