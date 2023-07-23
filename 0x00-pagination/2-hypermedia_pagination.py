#!/usr/bin/env python3
"""
2-hypermedia_pagination.py
"""
import csv
import math
from typing import List


def index_range(page, page_size):
    """
    Calculate the start and end index for pagination

    Args:
        page(int): The current page number (1-indexed).
        page_size(int): The number of items per page.

    Returns:
        Tuple containing start and end indices
    """
    start_index = (page - 1) * page_size
    end_index = page * page_size
    return (start_index, end_index)


class Server:
    """
    Server class to paginate a database of popular baby names
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """
        Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]
        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        Paginate a dataset

        Args:
            page(int): The current page number (1-indexed).
            page_size(int): The number of items per page.

        Returns:
            Appropiate page of dataset in a List
        """
        assert isinstance(page, int) and page > 0,\
            "Page must be a positive number"
        assert isinstance(page_size, int) and page > 0,\
            "Page_size must be a positive number"
        dataset = self.dataset()
        total_records = len(dataset)
        start_index, end_index = index_range(page, page_size)
        if start_index >= total_records:
            return []
        page_data = dataset[start_index:end_index]
        return page_data

    def get_hyper(self, page: int = 1, page_size: int = 10) -> dict:
        """
        Fetch pagination hypermedia

        Args:
            page(int): The current page number (1-indexed).
            page_size(int): The number of items per page.

        Returns:
            Dictionary with hypermedia info
        """
        assert isinstance(page, int) and page > 0,\
            "Page must be a positive number"
        assert isinstance(page_size, int) and page > 0,\
            "Page_size must be a positive number"
        data = self.get_page(page, page_size)
        total_records = len(self.dataset())
        total_pages = math.ceil(total_records/page_size)
        start_index, end_index = index_range(page, page_size)
        next_page = page + 1 if end_index < total_records else None
        prev_page = page - 1 if page > 1 else None
        return {
            "page_size": len(data),
            "page": page,
            "data": data,
            "next_page": next_page,
            "prev_page": prev_page,
            "total_pages": total_pages
        }
