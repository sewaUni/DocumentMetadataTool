import json
from .models import Paper, Literature, Person

# Function to serialize objects into JSON format
def serialize_object(obj):
    return json.dumps(vars(obj))

# Function to deserialize JSON format data of a paper
def deserialize_paper(jsonData):
    # Deserialize JSON into a Python dictionary
    data = json.loads(jsonData)

    # Filter out keys not present in the class constructor
    return Paper(
        title=data["title"],
        date=data["date"],
        id=data["id"],
        authors=data["authors"],
        supervisors=data["supervisors"],
        project_partner=data["project_partner"],
        language=data["language"],
        abstract=data["abstract"],
        methodology=data["methodology"],
        course=data["course"],
        pages=data["pages"],
        word_count=data["word_count"],
        literature=data["literature"],
        document=data["document"],
        infos=data["infos"]
    )

# Function to deserialize JSON format data of a paper
def deserialize_person(jsonData):
    # Deserialize JSON into a Python dictionary
    data = json.loads(jsonData)

    return Person(
        name=data["name"],
        person_type=data["person_type"],
        id=data["id"],
        email=data["email"],
        student_id=data["student_id"],
        student_role=data.get["student_role"]
    )

# Function to deserialize JSON format data of a paper
def deserialize_literature(jsonData):
    # Deserialize JSON into a Python dictionary
    data = json.loads(jsonData)

    return Literature(
        title=data["title"],
        id=data["id"],
        authors=data["authors"],
        date=data["date"],
        doi=data["doi"],
        url=data["url"]
    )