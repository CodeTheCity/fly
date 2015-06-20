import os
from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def welcome():
    return "welcome"

app.run(debug=True)
