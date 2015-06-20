import pymongo

import config

client = pymongo.MongoClient(config.mongo_dsn)
db = client['fly']
from random import randrange


class Doc():

    def __init__(self):
        pass

    def save():
        pass 

class Nature(Doc):
    def pick_five(self):
        """
        """
        numbers = [] 
        items = {}

        total = db['nature'].count()
        while len(numbers) < 5:
            my_random = randrange(0,total)
            if my_random not in numbers:
	        items[my_random] = db['nature'].find().limit(-1).skip(my_random).next()        
		numbers.append(my_random)

        return items

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




        

