def makeQuery(database, query):
    "Given a query, queries the database and returns the result"
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
    "Given a list of queries, queries the database and returns a list of the results in the same order."
    result = [None]*len(queryList)

    try:
        connection = pymysql.connect(host='138.68.243.154',
                                    user='makingbo',
                                    password='+m:u2iP2vLJZ77',
                                    db=database,
                                    charset='utf8mb4',
                                    cursorclass=pymysql.cursors.DictCursor)

        for i in range(len(queryList)):
            query = queryList[i]
            with connection.cursor() as cursor:
                try:
                    cursor.execute(query)
                    result[i] = cursor.fetchall()
                except:
                    pass

        connection.close()

    except:
        pass

    return result
