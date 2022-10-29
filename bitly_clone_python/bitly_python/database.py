import psycopg2

# USERNAME = 'danielnikkari'
# PASSWORD = 'password'
# DATABASE = 'flask_db'

def sendQuery(query, args):
  try:
    connect = psycopg2.connect(user=USERNAME, database=DATABASE) #password=PASSWORD,
    cur = connect.cursor()

    cur.execute(query, args)
    connect.commit()
  except (Exception, psycopg2.Error) as error:
    print("Error while connecting to PostgreSQL", error)
  finally:
    if connect:
        cur.close()
        connect.close()
        print("PostgreSQL connection is closed")

def getQuery(query, args):
  try:
    res = []
    connect = psycopg2.connect(user=USERNAME, database=DATABASE) #password=PASSWORD,
    cur = connect.cursor()

    cur.execute(query, args)
    res = cur.fetchall()
  except (Exception, psycopg2.Error) as error:
    print("Error while connecting to PostgreSQL", error)
  finally:
    if connect:
        cur.close()
        connect.close()
        print("PostgreSQL connection is closed")
    return res