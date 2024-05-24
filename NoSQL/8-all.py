#!/usr/bin/env python3
""" List all documents in Python  """
from pymongo import MongoClient


cliend = MongoClient('localhost', 27017)

def list_all(mongo_collection):
    ''' List all documents
    '''
    documents = client.mongo_collection.find()
    return documents
