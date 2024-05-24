#!/usr/bin/env python3
'''Python function that lists all documents in a collection
'''
from pymongo import MongoClient


client = MongoClient('localhost', 27017)

def list_all(mongo_collection):
    ''' List all documents
    '''
    documents = client.mongo_collection.find()
    return documents