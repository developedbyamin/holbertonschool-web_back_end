#!/usr/bin/env python3
"""
    Python function that inserts a new document in a collection based on kwargs
"""

from pymongo import MongoClient

def insert_school(mongo_collection, **kwargs):
    """
    Insert a new document in a collection based on kwargs.

    :param mongo_collection: The pymongo collection object
    :param kwargs: The fields and values to insert in the new document
    :return: The new _id of the inserted document
    """

    result = mongo_collection.insert_one(kwargs)

    return result.inserted_id