import pymongo

import config
import json 

client = pymongo.MongoClient(config.mongo_dsn)
db = client['fly']
from random import randrange


class Doc():
    collection = 'default'
    def __init__(self):
        pass

    def save():
        pass 
    
    def insert(self, doc):
        """
        Inserts a JSON document into the collection.
        """
        try:
	    data = json.loads(doc)
        except:
            raise ValueError,"We were expecting a JSON document"

        db[self.collection].insert(data)

    def recent_n(self,number):
        return list(db[self.collection].find().limit(number))
 
    def get_next_in_sequence(self):
        doc = db['counters'].find_and_modify(
            query = { "_id": self.counter}, 
            update = {"$inc":{"seq":1}},
            new=True)
        return int(doc['seq'])

    def pick_one(self):
        """
        Pick a random animal, vegetable, etc
        """
        return db[self.collection].find_one()

class Nature(Doc):
    collection = 'nature'
    def pick_five(self):
        """
        """
        numbers = [] 
        items = {}

        total = db[self.collection].count()
        while len(numbers) < 5:
            my_random = randrange(0,total)
            if my_random not in numbers:
	        items[my_random] = db[self.collection].find().limit(-1).skip(my_random).next()        
		numbers.append(my_random)

        return items.values()


class Quest(Doc):
    pass


class Find(Doc):
    collection = 'find'
    counter = 'find'
         


class User(Doc):
    pass




        

