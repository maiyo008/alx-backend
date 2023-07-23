#!/usr/bin/env python3
"""
0-simple_helper_function.py
"""


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
