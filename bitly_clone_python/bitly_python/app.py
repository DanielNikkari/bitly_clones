from crypt import methods
from tabnanny import check
from flask import Flask, session, redirect, url_for, render_template, request, jsonify
from helpers import *
import logging
from database import * 
from random import randrange

# HOSTNAME = 'localhost'
# USERNAME = 'danielnikkari'
# PASSWORD = 'password'
# DATABASE = 'flask_db'

# connect = psycopg2.connect(user=USERNAME, database=DATABASE) #password=PASSWORD,
# cur = connect.cursor()

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
  if request.method == "POST":
    # return {}, 200
    input_url = request.form.to_dict()['originalURL']
    random_found = False
    url_length = 6
    while not random_found:
      random_url = get_random_string(url_length)
      res = getQuery("""SELECT * FROM urls WHERE short_url = %s;""", [random_url])
      if len(res) == 0:
        random_found = True
    sendQuery("""INSERT INTO urls (url, short_url) VALUES (%s, %s)""",[input_url, random_url])
    new_id = getQuery("""SELECT * FROM urls WHERE short_url = %s""", [random_url])[0][0]
    status_code = 302
    return redirect(f"/shortened?id={new_id}", code = status_code)
  else:
     return render_template("index.html")

@app.route("/shortened", methods=["GET"])
def shortened_url():
  id = request.args.get('id')
  res = getQuery("""SELECT * FROM urls WHERE url_id = %s""", [id])[0]
  return render_template("shortened.html", original_url=res[1], id=res[0], shortened_url=res[2])

@app.route("/shortened/open", methods=["GET"])
def open_short_url():
  id = request.args.get('id')
  res = getQuery("""SELECT * FROM urls WHERE url_id = %s""", [id])[0]
  return redirect(res[1], code = 302)

@app.route("/random", methods=["GET"])
def redirect_to_random_url():
  res = getQuery("""SELECT * FROM urls;""", [])
  if res and len(res) > 0:
    random_url = res[randrange(len(res))][1]
    print(random_url)
  return redirect(random_url, code = 302)

@app.route("/<short_url>", methods=["GET"])
def short_url(short_url):
  url = getQuery("""SELECT * FROM urls WHERE short_url = %s""", [short_url])[0][1]
  return redirect(url, code = 302)


if __name__=="__main__":
  app.run(host="0.0.0.0", port=1234, debug=True) # host="0.0.0.0", port=1234, 