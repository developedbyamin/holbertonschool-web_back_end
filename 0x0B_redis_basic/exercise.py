#!/usr/bin/env python3

"""
Cache module to store data in Redis.
"""

import redis
import uuid
from typing import Union
import functools import wraps

def count_calls(method: Callable) -> Callable:
    """
    This function counts how many times Cache class called
    """
    @wraps(method)
    def wrapper(self, *args, **kwargs):
        key = method.__qualname__
        self._redis.incr(key)
        return method(self, *args, **kwargs)
    return wrapper

class Cache:
    """
    Cache class to store data in Redis.
    """
    def __init__(self) -> None:
        """
        Initialize the Cache instance with a Redis client.
        """
        self._redis = redis.Redis()
        self._redis.flushdb()

    @count_calls
    def store(self, data: Union[str, bytes, int, float]) -> str:
        """
        Store data in Redis using a randomly generated key.

        Args:
            data: The data to be stored. Can be str, bytes, int, or float.

        Returns:
            str: The randomly generated key used for storing the data in Redis.
        """
        key = str(uuid.uuid4())
        self._redis.set(key, data)
        return key

    def get(self, key: str, fn: Optional[Callable] = None)\
            -> UnionOfTypes:
        """get key from redis"""
        if data is None:
            return None
        if fn:
            return fn(data)
        return data

    def get_str(self, string: bytes) -> str:
        """ get a string """
        return string.decode("utf-8")

    def get_int(self, number: int) -> int:
        """ get int value"""
        return int(number)            