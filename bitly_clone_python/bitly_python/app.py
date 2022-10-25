from tabnanny import check
from flask import Flask, session, redirect, url_for, render_template, request, jsonify
import sqlite3
from helpers import *
import logging

connect = sqlite3.connect("db.sqlite3", check_same_thread=False)
cursor = connect.cursor()

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
  if request.method == "POST":
    print("\n!!!!!!!!!!!!!!!!!!!!!!!!\n", request.form, "\n!!!!!!!!!!!!!!!!!!!!!!!!\n")
    input_url = request.form.to_dict()['originalURL']
    print("\n!!!!!!!!!!!!!!!!!!!!!!!!\n", input_url, "\n!!!!!!!!!!!!!!!!!!!!!!!!\n")
    random_found = False
    url_length = 6
    while not random_found:
      random_url = get_random_string(url_length)
      print("\n!!!!!!!!!!!!!!!!!!!!!!!!\n", random_url, "\n!!!!!!!!!!!!!!!!!!!!!!!!\n")
    status_code = 200
    response = {'message': 'adding url succesfull'}
    return jsonify(response), status_code
  else:
     return render_template("index.html")

if __name__=="__main__":
  app.run(host="0.0.0.0", port=1234, debug=True) # host="0.0.0.0", port=1234, 