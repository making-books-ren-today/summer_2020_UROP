import pymysql.cursors

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

def multiQuery(database, queryList):
  result = [None]*len(queryList)

  try:
    connection = pymysql.connect(host='138.68.243.154',
                                user='makingbo',
                                password='+m:u2iP2vLJZ77',
                                db=database,
                                charset='utf8mb4',
                                cursorclass=pymysql.cursors.DictCursor)

    with connection.cursor() as cursor:
      try:
        for i in range(len(queryList)):
            cursor.execute(queryList[i])
            result[i] = cursor.fetchall()
      except:
        pass
      finally:
        connection.close()
  except:
    pass
  
  return result