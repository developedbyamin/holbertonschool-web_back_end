#!/usr/bin/env python3
""" List all documents in Python  """
from pymongo import MongoClient
def list_all(school_collection):
    findcollection = school_collection.find()
    return findcollection
