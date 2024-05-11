from rest_framework import serializers
from .models import Paper, Literature, Person

# Serializer for class Paper
class PaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paper
        fields = ('id', 'title', 'date', 'authors', 'supervisors', 'project_partner', 'language', 'abstract', 'methodology', 'course','pages', 'word_count', 'literature', 'document','infos')

# Serializer for class Literature
class LiteratureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Literature
        fields = ('id', 'title', 'authors', 'date', 'doi', 'url')

# Serializer for class Literature
class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('id', 'name', 'email', 'person_type', 'student_id', 'student_role')