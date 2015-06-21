import os, json, time
from flask import Flask, render_template, Response
from flask_restful import Resource, Api, reqparse
from lib.db import Doc, Nature, Find, User, Quest
import datetime


app = Flask(__name__)
api = Api(app)

cj = None

@app.route('/')
def welcome():
    return render_template('welcome.html') 

    
@app.route('/api/time')
def get_next_quest_time():
    q = Quest()
    latest = q.pick_one()
    started = latest['start_time']
    return json.dumps('{"started":'+str(started)+'}') 


class Species(Resource):
    """
    Generate a list of five random quest items
    """
    def get(self):
        n = Nature()
        return n.pick_five()


class StorableResource(Resource):
    obj = Doc
    def get(self, id):
        o = self.obj()
        return o.pick_one() 

    def post(self):
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

        o = self.obj()
        data['_id'] = o.get_next_in_sequence()

        o.insert(json.dumps(data))
        return {'success':data['_id']}, 200

class CurrentQuest(StorableResource):
    def get(self):
        q = Quest()
        return q.pick_one()

    def post(self):
        pass

class NewQuest(Resource):

    def post(self):
        doc = {}
        q = Quest()
        n = Nature()
        items = n.pick_five()
       
        doc['start_time'] = time.time()
        doc['items'] = items
        doc['_id'] = q.get_next_in_sequence()
        
        q.insert(json.dumps(doc))

        return {"success":doc['_id']}, 200
        
class UserFind(StorableResource):
    """
    POST a new find or GET a recorded one
    """
    obj = Find


class UserDetails(StorableResource):
    """
    
    """
    obj = User  
 
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


api.add_resource(Species, '/quest/species/')
api.add_resource(UserFind, '/find/', '/find/<id>')
api.add_resource(RecentFinds,'/finds/recent/')
api.add_resource(UserDetails, '/user/', '/user/<id>')
api.add_resource(Scoreboard, '/scoreboard/')
api.add_resource(CurrentQuest, '/quest/')
api.add_resource(NewQuest, '/quest/new/')


if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
