import psycopg2
import os

# USERNAME = 'username'
# PASSWORD = 'password'
# DATABASE = 'database'

USERNAME = os.environ['POSTGRES_USER']
PASSWORD = os.environ['POSTGRES_PASSWORD']
DATABASE = os.environ['POSTGRES_DB']
HOST = os.environ['PGHOST']
PORT = os.environ['PGPORT']
# HOST = 'dab-p1-database-94059c7f-2b9f-447e-8d39-bf6f4074f209'
# PORT = '5432'

def sendQuery(query, args):
  try:
    connect = psycopg2.connect(user=USERNAME, password=PASSWORD, host=HOST, port=PORT, database=DATABASE)
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
    connect = psycopg2.connect(user=USERNAME, password=PASSWORD, host=HOST, port=PORT, database=DATABASE) #password=PASSWORD,
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