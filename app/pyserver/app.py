import os
from flask import Flask, render_template, Response 
from flask_restful import Resource, Api
from lib.db import Nature
from bson import json_util

app = Flask(__name__)
api = Api(app)

@app.route('/')
def welcome():
    return render_template('welcome.html') 


class Quest(Resource):
    def get(self):
        pass


class QuestList(Resource):
    def get(self):
        n = Nature()
        return json_util.dumps(n.pick_five())
        
api.add_resource(QuestList,'/api/quest/list/')

if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
