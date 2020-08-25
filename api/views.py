from django.shortcuts import render
from django.http import JsonResponse

# Allows the use of API decorator to fully access Django REST functionality
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TaskSerializer

from .models import Task

import pymysql.cursors
import json

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


def makeQuery(database, query):
  result = None

  try:
    connection = pymysql.connect(host='138.68.243.154',
                                user='makingbo',
                                password='+m:u2iP2vLJZ77',
                                db=database,
                                charset='utf8mb4',
                                cursorclass=pymysql.cursors.DictCursor)

    with connection.cursor() as cursor:
      try:
        cursor.execute(query)
        result = cursor.fetchall()
      except:
        pass
      
  finally:
    connection.close()
  
  return result


@api_view(['GET'])
def databaseView(request):
  context = dict()

  conditions = ['1']
  for item in request.GET.items():
    if item[1]:
      conditions.append("({0} REGEXP '{1}')".format(item[0], item[1]))
  query = "SELECT * FROM `ADDRESSES2` WHERE " + " AND ".join(conditions) + " LIMIT 25"
  context['entry'] = makeQuery('makingbo_test_database', query)

  query = "SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'ADDRESSES2'"
  context['columns'] = makeQuery('makingbo_test_database', query)

  context['extraheadings'] = ('LBTNumber', 'DateAdd', 'DiscAdd', 'ApproxDateAdd', 'SortAdd', 'CommentAdd')

  return Response(context)

@api_view(['GET'])
def getDatabase(request):
  query = "SELECT * FROM `books` LIMIT 25"
  context['entry'] = makeQuery('makingbo_test_database', query)

  query = "SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'books'"
  context['columns'] = makeQuery('makingbo_test_database', query)

  return Response(context)

@api_view(['GET'])
def getBooks(request):
  context = dict()

  conditions = ['1']
  for item in request.GET.items():
    if item[1]:
      conditions.append("({0} REGEXP '{1}')".format(item[0], item[1]))
  query = "SELECT * FROM `books` WHERE " + " AND ".join(conditions) + " LIMIT 25"
  context['entry'] = makeQuery('makingbo_test_database', query)

  query = "SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'books'"
  context['columns'] = makeQuery('makingbo_test_database', query)

  context['extraheadings'] = tuple()

  return Response(context)

@api_view(['POST'])
def insertPost(request):
  data = request.data

  postData('makingbo_hizami_test', 'Test Table', data)

  return Response("Success!")

def postData(database, table, data):
  columns = ', '.join(data.keys())
  values = ', '.join([json.dumps(value) for value in data.values()])

  query = "INSERT INTO `{0}` ({1}) VALUES ({2})".format(table, columns, values)
  makeQuery(database, query)