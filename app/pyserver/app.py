import os
from flask import Flask, render_template, Response
from flask_restful import Resource, Api, reqparse
from lib.db import Nature, Find, User, Quest
import json

app = Flask(__name__)
api = Api(app)


@app.route('/')
def welcome():
    return render_template('welcome.html') 


class CurrentQuest(Resource):
    def get(self):
        pass


    def post(self):
        pass


class QuestList(Resource):
    """
    Generate a list of five random quest items
    """
    def get(self):
        n = Nature()
        return n.pick_five()


class UserFind(Resource):
    """
    POST a new find or GET a recorded one    
    """
    def get(self,id):
        return {}

    def post(self,id=None):
        """
        Add a new find to the collection.
        """
        
        parser = reqparse.RequestParser()
        parser.add_argument('data',type=str)
        args = parser.parse_args()

        data = {}        
        input = args['data']

        # we roundtrip the data into python and back to JSON
        # in the real world, we would validate the data structure here.

        try:
            data = json.loads(input)
        except ValueError, e:
            return {'error', e.message}, 500

        find = Find()
        data['_id'] = find.get_next_in_sequence()

        find.insert(json.dumps(data))
        return {'success':data['_id']}, 200


class UserDetails(Resource):
    """
    
    """
    def get(self, id):
        return {}, 200 

    def post(self, id=None):
	pass
   
class RecentFinds(Resource):
    """
    """
    def get(self):
        f = Find()
	return f.recent_n(10)
 
 
class Scoreboard(Resource):
    """
    """
    def get(self):
        pass 
  
api.add_resource(QuestList,'/api/quest/list/')
api.add_resource(UserFind,'/api/find/', '/api/find/<id>')
api.add_resource(RecentFinds,'/api/finds/recent/')
api.add_resource(UserDetails,'/api/user/<id>')
api.add_resource(Scoreboard,'/api/scoreboard/')
api.add_resource(CurrentQuest,'/api/quest/')


if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
