from django.db import models
from django.contrib.postgres.fields import ArrayField

# Class for the literature in a paper
class Literature():
    def __init__(self, title, id=None, authors="", date="", doi="", url=""):
        self.id = id
        self.title = title
        self.authors = authors
        self.date = date
        self.doi = doi
        self.url = url


class Literature(models.Model):
    id = models.CharField(max_length=255, primary_key=True)
    title = models.CharField(max_length=255)
    authors = models.CharField(max_length=1000, null=True)
    date = models.CharField(max_length=255, null=True)
    doi = models.CharField(max_length=255, default="", null=True)
    url = models.CharField(max_length=255, default="", null=True)

# Model for a paper
class Paper(models.Model):
    id = models.CharField(max_length=255, primary_key=True)
    title = models.CharField(max_length=255)
    date = models.DateTimeField()
    authors = ArrayField(models.CharField(max_length=255), blank=True, null=True) # Stores the record id for the person
    supervisors = ArrayField(models.CharField(max_length=255), blank=True, null=True) # Stores the record id for the person
    project_partner = models.CharField(default="", max_length=255, null=True)
    language = models.CharField(default="", max_length=255)
    abstract = models.CharField(default="", max_length=10000)
    methodology = models.CharField(default="", max_length=255, null=True)
    course = models.CharField(default="", max_length=255)
    pages = models.IntegerField(default=-1)
    word_count = models.IntegerField(default=-1)
    literature = ArrayField(models.CharField(max_length=255), blank=True, null=True) # Stores the record id for the literature
    document = models.FileField(upload_to='pdf_documents/')
    infos = models.CharField(default="", max_length=1000, null=True)

# Model for a person (either a supervisor or an author)
class Person(models.Model):
    id = models.CharField(max_length=255, primary_key=True)
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, blank=True, null=True)
    person_type = models.CharField(max_length=255)
    student_id = models.CharField(max_length=255, blank=True, null=True)
    student_role = models.CharField(max_length=255, blank=True, null=True)







