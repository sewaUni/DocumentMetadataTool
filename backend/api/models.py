from django.db import models

# Create your models here.

# Model for the literature in a paper
class Literature(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    authors = models.CharField(max_length=1000)
    date = models.DateTimeField()
    doi = models.CharField(max_length=255, default="")
    url = models.CharField(max_length=255, default="")

# Model for an uploaded paper
class Paper(models.Model):
    id = models.AutoField(primary_key=True)
    pdfFile = models.FileField(upload_to='pdf_documents/')
    title = models.CharField(max_length=255)
    date = models.DateTimeField(auto_now_add=True)
    projectPartner = models.CharField(default="", max_length=255)
    language = models.CharField(default="", max_length=255)
    abstract = models.CharField(default="", max_length=10000)
    methodology = models.CharField(default="", max_length=255)
    course = models.CharField(default="", max_length=255)
    pages = models.IntegerField()
    literature = models.ManyToManyField(Literature)
    wordCount = models.IntegerField()






