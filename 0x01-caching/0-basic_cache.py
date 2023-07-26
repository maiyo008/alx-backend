#!/usr/bin/python3
"""
Basic Dictionary
"""
BaseCaching = __import__('base_caching').BaseCaching


class BasicCache(BaseCaching):
    """
    A caching system
    """

    def __init__(self):
        """
        Initialization of storage dict
        """
        super().__init__()

    def put(self, key, item):
        """
        Add item to dict from parent class
        """
        if key is None or item is None:
            pass
        else:
            self.cache_data[key] = item

    def get(self, key):
        """
        Return value from dictionary linked to key
        """
        if key is None:
            return None
        return self.cache_data.get(key, None)
