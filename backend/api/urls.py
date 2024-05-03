from django.urls import path
from .views import uploadPaper, updatePaper, getPapers

urlpatterns = [
    path('get-papers', getPapers),
    path('upload-paper', uploadPaper),
    path('update-paper', updatePaper)
]