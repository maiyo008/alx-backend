#!/usr/bin/python3
"""
FIFO Caching implementation
"""
from collections import OrderedDict
BaseCaching = __import__('base_caching').BaseCaching


class FIFOCache(BaseCaching):
    """
    FIFO Caching
    """
    def __init__(self):
        """
        Initialization
        """
        super().__init__()

    def put(self, key, item):
        """
        Add to the cache
        Implement FIFO replacement
        """
        if key is None or item is None:
            pass
        if len(self.cache_data) >= self.MAX_ITEMS:
            if key not in self.cache_data:
                first_key = next(iter(self.cache_data))
                self.cache_data.pop(first_key)
                print("DISCARD: {}".format(first_key))
        self.cache_data[key] = item

    def get(self, key):
        """
        Return value from dictionary linked to key
        """
        if key is None:
            return None
        return self.cache_data.get(key, None)
