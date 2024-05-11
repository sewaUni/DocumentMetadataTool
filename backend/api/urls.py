from django.urls import path
from .views import uploadPaper, updatePaper, testLLM, testDatabaseWriting

urlpatterns = [
    path('test-llm-output', testLLM),
    path('test-writing-to-database', testDatabaseWriting),
    path('upload-paper', uploadPaper),
    path('update-paper', updatePaper)
]