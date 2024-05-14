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

# Class for a person (either a supervisor or an author)
class Person:
    def __init__(self, name, person_type, id=None, email=None, student_id=None, student_role=None):
        self.id = id
        self.name = name
        self.person_type = person_type
        self.email = email
        self.student_id = student_id
        self.student_role = student_role

# Class for a paper
class Paper:
    def __init__(self, title, date, id=None, authors=None, supervisors=None, project_partner=None,
                 language="", abstract="", methodology=None, course="", pages=-1, word_count=-1,
                 literature=None, document=None, infos=None):
        self.id = id
        self.title = title
        self.date = date
        self.authors = authors if authors is not None else [] # Stores the record id for the person
        self.supervisors = supervisors if supervisors is not None else [] # Stores the record id for the person
        self.project_partner = project_partner
        self.language = language
        self.abstract = abstract
        self.methodology = methodology
        self.course = course
        self.pages = pages
        self.word_count = word_count
        self.literature = literature if literature is not None else [] # Stores the record id for the literature
        self.document = document
        self.infos = infos

    def __str__(self):
        return f"Paper: {self.title}\nDate: {self.date}\nID: {self.id}\nAuthors: {self.authors}\nSupervisors: {self.supervisors}\nProject Partner: {self.project_partner}\nLanguage: {self.language}\nAbstract: {self.abstract}\nMethodology: {self.methodology}\nCourse: {self.course}\nPages: {self.pages}\nWord Count: {self.word_count}\nLiterature: {self.literature}\nDocument: {self.document}\nInfos: {self.infos}"










