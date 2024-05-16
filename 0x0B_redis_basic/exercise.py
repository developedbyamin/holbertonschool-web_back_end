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

    def get(self, key: str, fn: Optional[Callable] = None) -> Union[str, bytes, int, None]:
        data = self._redis.get(key)
        if data is None:
            return None
        if fn:
            return fn(data)
        return data

    def get_str(self, string: bytes) -> str:
        return string.decode("utf-8")

    def get_int(self, number: int) -> int:
        return int(number)