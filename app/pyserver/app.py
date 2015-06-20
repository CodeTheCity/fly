import os
from flask import Flask

app = Flask(__name__)

@app.route('/')
def welcome():
    return open("index.html","r").read()

app.run()
