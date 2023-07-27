#!/usr/bin/env python3
"""
LRU Caching implementation
"""
BaseCaching = __import__('base_caching').BaseCaching


class LRUCache(BaseCaching):
    """
    LRU Caching
    """

    def __init__(self):
        super().__init__()
        self.usage_order = []

    def put(self, key, item):
        """
        Updates cache
        Implement LRU replacement
        """
        if key is None or item is None:
            return
        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            if key not in self.cache_data:
                lru_key = self.usage_order.pop(0)
                self.cache_data.pop(lru_key)
                print("DISCARD: {}".format(lru_key))
        self.cache_data[key] = item
        if key in self.usage_order:
            self.usage_order.remove(key)
        self.usage_order.append(key)

    def get(self, key):
        """
        Return value from dictionary linked to key
        """
        if key is None:
            return None
        return self.cache_data.get(key, None)
