from django.shortcuts import render
from django.http import JsonResponse

# Allows the use of API decorator to fully access Django REST functionality
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics

from django.contrib.auth.models import User
from django.contrib.auth import authenticate, logout
from .models import Post
from .serializers import PostSerializer

import pymysql.cursors
import json

from .utilities import *

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

def generateInsertQuery(database, table, data):
    columns = ', '.join(data.keys())
    values = "'" + "', '".join([json.dumps(value) for value in data.values()]) + "'"

    query = "INSERT INTO `{0}` ({1}) VALUES ({2});".format(
        table, columns, values)
    return query



@api_view(['POST'])
def createUser(request):
    username = request.data['username']
    email = request.data['email']
    password = request.data['password']

    User.objects.create_user(username, email, password)

    return Response("Success!")

@api_view(['POST'])
def loginUser(request):
    username = request.data['username']
    password = request.data['password']

    user = authenticate(username=username, password=password)
    if user is not None:
        # A backend authenticated the credentials
        return Response(user.id)
    else:
        # No backend authenticated the credentials
        return Response("Failure!")

@api_view(['GET'])
def logoutUser(request):
    logout(request)
    return Response("Logged out!")



@api_view(['GET'])
def getSites(request, userId):
    database = "makingbo_usermade_sites_database"
    table = "Sites"

    query = "SELECT * FROM `Pages` WHERE `User`={0}".format(userId)

    result = makeQuery(database, query)

    return Response({'sites': result})

@api_view(['GET'])
def getPages(request, siteId):
    database = "makingbo_usermade_sites_database"
    table = "Sites"

    query = "SELECT * FROM `Pages` WHERE `Site`={0}".format(siteId)

    result = makeQuery(database, query)

    return Response({'pages': result})

@api_view(['POST'])
def addPage(request, siteId):
    title = request.data['title']
    content = request.data['content']

    database = 'makingbo_usermade_sites_database'
    table = 'Pages'
    data = {'Site': siteId, 'User': 1, 'Title': title, 'Content': content}

    query1 = generateInsertQuery(database, table, data)
    query2 = "SELECT LAST_INSERT_ID();"
    
    queryList = [query1, query2]

    result = multiQuery(database, queryList)
    pageId = result[1][0]["LAST_INSERT_ID()"]

    return Response({'pageId': pageId})

@api_view(['GET'])
def getPage(request, siteId, pageId):
    database = "makingbo_usermade_sites_database"
    table = "Pages"

    query = "SELECT * FROM `Pages` WHERE `ID`={0}".format(pageId)
    result = makeQuery(database, query)
    pageData = result[0]

    return Response({'page': result})

@api_view(['POST'])
def updatePage(request, siteId, pageId):
    title = request.data['title']
    content = request.data['content']

    database = "makingbo_usermade_sites_database"
    table = "Pages"

    query = "UPDATE `{0}` SET `title`={1}, `content`={2} WHERE ID={3}".format(table, title, content, pageId)
    makeQuery(database, query)

    return Response("Success!")