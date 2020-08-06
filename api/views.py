from django.shortcuts import render
from django.http import JsonResponse

# Allows the use of API decorator to fully access Django REST functionality
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TaskSerializer

from .models import Task

# Create your views here.


@api_view(['GET'])  # this View only allows GET requests
def apiOverview(request):
    api_urls = {
        'List': '/task-list/',
        'Detail View': '/task-detail/<str:pk>/',
        'Create': '/task-create/',
        'Update': '/task-update/<str:pk>/',
        'Delete': '/task-delete/<str:pk>/',
    }
    return Response(api_urls)


@api_view(['GET'])
def taskList(request):
    # Fetch all tasks
    tasks = Task.objects.all()
    # Serialize means to store / transmit objects as series of bits (bytes)
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def taskDetail(request, pk):
    # Get that one particular to-do by ID
    tasks = Task.objects.get(id=pk)
    # Serialize means to store / transmit objects as series of bits (bytes)
    serializer = TaskSerializer(tasks, many=False)
    return Response(serializer.data)


@api_view(['POST'])  # this View only allows POST requests
def taskCreate(request):
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['POST'])  # this View only allows POST requests
def taskUpdate(request, pk):  # pk = primary key\
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(
        instance=task, data=request.data)  # store user input

    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['POST'])  # this View only allows POST requests
def taskDelete(request, pk):  # pk = primary key\
    task = Task.objects.get(id=pk)
    # Delete the item by a simple delete()
    task.delete()
    return Response("Success! Good first step to Django and being an expert")
