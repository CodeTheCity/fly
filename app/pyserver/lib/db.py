import pymongo

import config
import json 

client = pymongo.MongoClient(config.mongo_dsn)
db = client['fly']
from random import randrange


class Doc():

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

    def pick_one(self):
        """
        Pick a random animal, vegetable, etc
	"""
        return db['nature'].find_one()


class Quest(Doc):
    pass


class Find(Doc):
    pass


class User(Doc):
    pass




        

