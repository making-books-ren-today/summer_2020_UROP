from django.shortcuts import render
from django.http import JsonResponse

# Allows the use of API decorator to fully access Django REST functionality
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TaskSerializer

from .models import Task

import pymysql.cursors

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


@api_view(['GET'])
def databaseView(request):
  context = dict()

  conditions = ['1']
  for item in request.GET.items():
    if item[1]:
      conditions.append("({0} REGEXP '{1}')".format(item[0], item[1]))
  query = "SELECT * FROM `ADDRESSES2` WHERE " + " AND ".join(conditions) + " LIMIT 25"

  try:
    connection = pymysql.connect(host='138.68.243.154',
                                user='makingbo',
                                password='+m:u2iP2vLJZ77',
                                db='makingbo_test_database',
                                charset='utf8mb4',
                                cursorclass=pymysql.cursors.DictCursor)

    try:
        with connection.cursor() as cursor:
            try:
              sql = query
              cursor.execute(sql)
              result = cursor.fetchall()
              context = {'entry': result}
            except:
              pass

            try:
              sql = "SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'ADDRESSES2'"
              cursor.execute(sql)
              result = cursor.fetchall()
              context['columns'] = result
            except:
              pass
    finally:
        connection.close()
  except:
    pass

  context['extraheadings'] = ('LBTNumber', 'DateAdd', 'DiscAdd', 'ApproxDateAdd', 'SortAdd', 'CommentAdd')

  return Response(context)
  
@api_view(['GET'])
def getBooks(request):
  context = dict()

  conditions = ['1']
  for item in request.GET.items():
    if item[1]:
      conditions.append("({0} REGEXP '{1}')".format(item[0], item[1]))
  query = "SELECT * FROM `books` WHERE " + " AND ".join(conditions) + " LIMIT 25"

  try:
    connection = pymysql.connect(host='138.68.243.154',
                                user='makingbo',
                                password='+m:u2iP2vLJZ77',
                                db='makingbo_test_database',
                                charset='utf8mb4',
                                cursorclass=pymysql.cursors.DictCursor)

    try:
        with connection.cursor() as cursor:
            try:
              sql = query
              cursor.execute(sql)
              result = cursor.fetchall()
              context = {'entry': result}
            except:
              pass

            try:
              sql = "SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'books'"
              cursor.execute(sql)
              result = cursor.fetchall()
              context['columns'] = result
            except:
              pass
    finally:
        connection.close()
  except:
    pass

  context['extraheadings'] = tuple()

  return Response(context)