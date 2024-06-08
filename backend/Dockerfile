# Use an official Python runtime as a parent image
FROM python:3.12.3-slim

# Install PostgreSQL client libraries
RUN apt-get update \
    && apt-get install -y libpq-dev gcc \
	&& apt-get install build-essential -y \
    && apt-get clean

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install pyproject-toml \
	&& pip install -U langchain-community \
	&& pip install --no-cache-dir -r requirements.txt

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Define environment variable
ENV PYTHONUNBUFFERED=1

# Run the application
CMD python manage.py runserver 0.0.0.0:8000
