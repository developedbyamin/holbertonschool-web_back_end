#!/usr/bin/env python3
""" List all documents in Python  """
import pymongo
def list_all(school_collection):
    findcollection = school_collection.find()
    return findcollection
