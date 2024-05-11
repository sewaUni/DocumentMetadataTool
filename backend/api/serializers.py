import json
from .models import Paper, Literature, Person

# Function to serialize objects into JSON format
def serialize_object(obj):
    return json.dumps(vars(obj))

# Function to deserialize JSON format data of a paper
def deserialize_paper(jsonData):
    # Deserialize JSON into a Python dictionary
    data_dict = json.loads(jsonData)

    # Filter out keys not present in the class constructor
    filtered_data = {key: value for key, value in data_dict.items() if key in Paper.__init__.__code__.co_varnames}

    # Map 'collectionId' to 'id'
    filtered_data['id'] = data_dict.pop('collectionId')

    return filtered_data

# Function to deserialize JSON format data of a paper
def deserialize_person(jsonData):
    # Deserialize JSON into a Python dictionary
    data_dict = json.loads(jsonData)

    # Filter out keys not present in the class constructor
    filtered_data = {key: value for key, value in data_dict.items() if key in Person.__init__.__code__.co_varnames}

    # Map 'collectionId' to 'id'
    filtered_data['id'] = data_dict.pop('collectionId')

    return filtered_data

# Function to deserialize JSON format data of a paper
def deserialize_literature(jsonData):
    # Deserialize JSON into a Python dictionary
    data_dict = json.loads(jsonData)

    # Filter out keys not present in the class constructor
    filtered_data = {key: value for key, value in data_dict.items() if key in Literature.__init__.__code__.co_varnames}

    # Map 'collectionId' to 'id'
    filtered_data['id'] = data_dict.pop('collectionId')

    return filtered_data