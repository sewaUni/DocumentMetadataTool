from django.urls import path
from .views import uploadPaper, updatePaper, testLLM

urlpatterns = [
    path('test-llm-output', testLLM),
    path('upload-paper', uploadPaper),
    path('update-paper', updatePaper)
]