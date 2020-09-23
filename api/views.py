from django.shortcuts import render
from django.http import JsonResponse

# Allows the use of API decorator to fully access Django REST functionality
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics

from .models import Post
from .serializers import PostSerializer

import pymysql.cursors
import json

# Create your views here.


class Forum(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


@api_view(['GET'])  # this View only allows GET requests
def apiOverview(request):
    api_urls = {
        'List': '/Post-list/',
        'Detail View': '/task-detail/<str:pk>/',
        'Create': '/task-create/',
        'Update': '/task-update/<str:pk>/',
        'Delete': '/task-delete/<str:pk>/',
    }
    return Response(api_urls)


@api_view(['GET'])
def forum(request):
    # Fetch all tasks
    posts = Post.objects.all()
    # Serialize means to store / transmit objects as series of bits (bytes)
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def postDetail(request, pk):
    # Get that one particular to-do by ID
    posts = Post.objects.get(id=pk)
    # Serialize means to store / transmit objects as series of bits (bytes)
    serializer = PostSerializer(posts, many=False)
    return Response(serializer.data)


@api_view(['POST'])  # this View only allows POST requests
def postCreate(request):
    serializer = PostSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['POST'])  # this View only allows POST requests
def postUpdate(request, pk):  # pk = primary key\
    post = Post.objects.get(id=pk)
    serializer = PostSerializer(
        instance=post, data=request.data)  # store user input

    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['POST'])  # this View only allows POST requests
def postDelete(request, pk):  # pk = primary key\
    post = Post.objects.get(id=pk)
    # Delete the item by a simple delete()
    post.delete()
    return Response("Success!")


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
  except:
    pass
  
  return result


@api_view(['GET'])
def databaseView(request):
    context = dict()

    conditions = ['1']
    for item in request.GET.items():
        if item[1]:
            conditions.append("({0} REGEXP '{1}')".format(item[0], item[1]))
    query = "SELECT * FROM `ADDRESSES2` WHERE " + \
        " AND ".join(conditions) + " LIMIT 25"
    context['entry'] = makeQuery('makingbo_test_database', query)

    query = "SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'ADDRESSES2'"
    context['columns'] = makeQuery('makingbo_test_database', query)

    context['extraheadings'] = (
        'LBTNumber', 'DateAdd', 'DiscAdd', 'ApproxDateAdd', 'SortAdd', 'CommentAdd')

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
    query = "SELECT * FROM `books` WHERE " + \
        " AND ".join(conditions) + " LIMIT 25"
    context['entry'] = makeQuery('makingbo_test_database', query)

    query = "SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'books'"
    context['columns'] = makeQuery('makingbo_test_database', query)

    context['extraheadings'] = tuple()

    return Response(context)


@api_view(['GET'])
def getPeople(request):
    context = dict()

    conditions = ['1']
    for item in request.GET.items():
        if item[1]:
            conditions.append("({0} REGEXP '{1}')".format(item[0], item[1]))
    query = """SELECT DISTINCT `LBT-INDEX`.LBTNumber, `LBT-INDEX`.SurnameIndex, `LBT-INDEX`.ForenamesIndex,
              ADDRESSES2.Address, ADDRESSES2.StNumber, 
              DEATHS.DateDd, DEATHS.ApproxDateDd, DEATHS.BeforeDateDd, DEATHS.AfterDateDd
              FROM `LBT-INDEX` 
              LEFT JOIN ADDRESSES2 ON (ADDRESSES2.LBTNumber = `LBT-INDEX`.LBTNumber) 
              LEFT JOIN DEATHS ON (DEATHS.LBTNumber = `LBT-INDEX`.LBTNumber) 
              WHERE """ + " AND ".join(conditions) + " LIMIT 25"

    result = makeQuery('makingbo_people', query)

    def process(data):
        result = {}
        result['LBTNumber'] = data['LBTNumber']
        result['Surname'] = data['SurnameIndex']
        result['Forename'] = data['ForenamesIndex']
        result['Address'] = data['Address']
        result['StNumber'] = data['StNumber']
        result['Died'] = data['DateDd'] or data['ApproxDateDd']
        return result

    people = [process(item) for item in result]
    context['people'] = people


@api_view(['POST'])
def insertPost(request):
    data = request.data

    postData('makingbo_hizami_test', 'Test Table', data)

    return Response("Success!")


def postData(database, table, data):
    columns = ', '.join(data.keys())
    values = "'" + "', '".join([json.dumps(value) for value in data.values()]) + "'"

    query = "INSERT INTO `{0}` ({1}) VALUES ({2})".format(
        table, columns, values)
    makeQuery(database, query)

@api_view(['POST'])
def insertJSON(request):
  data = request.data

  postData('makingbo_hizami_test', 'Test JSON', data)

  return Response("data")
