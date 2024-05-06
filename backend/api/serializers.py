from rest_framework import serializers
from .models import Paper, Literature

# Serializer for class Paper
class PaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paper
        fields = ('id', 'title', 'date', 'projectPartner', 'language', 'abstract', 'methodology', 'course', 'pages', 'literature','wordCount')

# Serializer for class Literature
class LiteratureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Literature
        fields = ('id', 'title', 'authors', 'date', 'doi', 'url')