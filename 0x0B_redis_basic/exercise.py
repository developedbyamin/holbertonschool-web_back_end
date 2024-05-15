#!/usr/bin/env python3

"""
Cache module to store data in Redis.
"""

import redis
import uuid
from typing import Union

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
    
    def get(self, key: str, fn: Callable = None) -> Union[str, bytes, int, float]:
        if not self._redis.exists(key):
            return None:
        value = self._redis.get(key)
        if fn:
            return fn(value)
        return value


        def get_str(self,key: str) -> Union[str, None]:
            return self.get(key, fn=lambda d: d.dcode("utf-8"))
    
        def get_int(self, key: str) -> Union[int, None]:
        return self.get(key, fn=int)                