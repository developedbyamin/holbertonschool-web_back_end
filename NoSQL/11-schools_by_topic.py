#!/usr/bin/env python3
"""
    Python function that returns the list of school having a specific topic
"""
from pymongo import MongoClient

def schools_by_topic(mongo_collection, topic):
    """
    Returns the list of schools having a specific topic.

    :param mongo_collection: The pymongo collection object
    :param topic: The topic to search for
    :return: List of schools matching the specified topic
    """
    schools = mongo_collection.find({"topics": topic})
    return schools