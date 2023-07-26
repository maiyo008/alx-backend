#!/usr/bin/env python3
"""
LIFO Caching implementation
"""
BaseCaching = __import__('base_caching').BaseCaching


class LIFOCache(BaseCaching):
    """
    LIFO Caching
    """

    def __init__(self):
        """
        Initialization
        """
        super().__init__()
        self.insertion_order = []

    def put(self, key, item):
        """
        Update cache
        Implement LIFO replacement
        """
        if key is None or item is None:
            return
        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            if key not in self.cache_data:
                last_key = self.insertion_order.pop()
                self.cache_data.pop(last_key)
                print("DISCARD: {}".format(last_key))
        self.cache_data[key] = item
        self.insertion_order.append(key)

    def get(self, key):
        """
        Return value from dictionary linked to key
        """
        if key is None:
            return None
        return self.cache_data.get(key, None)
