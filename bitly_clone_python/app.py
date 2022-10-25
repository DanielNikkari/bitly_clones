from tabnanny import check
from flask import Flask, session, redirect, url_for, render_template, request
import sqlite3
from helpers import *

connect = sqlite3.connect("db.sqlite3", check_same_thread=False)
cursor = connect.cursor()

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
  if request.method == "POST":
    pass
  else:
     return render_template("index.html")

if __name__=="__main__":
  app.run(host="0.0.0.0", port=1234, debug=True)