# 0x00-pagination
----
## What is pagination 
Pagination is a technique used in user interfaces, especially in web applications and content-heavy websites, to divide large amounts of data or content into smaller, more manageable chunks or pages. The purpose of pagination is to enhance user experience by reducing the load time and improving navigation through the content.

In the context of web pages, pagination usually involves breaking up long lists of items, search results, or articles into separate pages. Instead of showing all items at once, users can view a specific number of items per page and navigate through the content using page numbers or navigation arrows. Common examples of paginated content include search result pages, blog archives, comments sections, and product listings on e-commerce websites.

## Resources
**Read or watch:**

* [REST API Design: Pagination](moesif.com/blog/technical/api-design/REST-API-Design-Filtering-Sorting-and-Pagination/#pagination)
* [HATEOAS](https://en.wikipedia.org/wiki/HATEOAS)

## Learning Objectives
At the end of this project, you are expected to be able to explain to anyone, without the help of Google:

* How to paginate a dataset with simple page and page_size parameters
* How to paginate a dataset with hypermedia metadata
* How to paginate in a deletion-resilient manner

### Setup: Popular_Baby_Names.csv
[use this data file](https://s3.amazonaws.com/alx-intranet.hbtn.io/uploads/misc/2020/5/7d3576d97e7560ae85135cc214ffe2b3412c51d7.csv?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARDDGGGOUSBVO6H7D%2F20230722%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230722T172656Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=dd37dc80a9685c07b49dccf31603e62f903d7c0f1406383f3a6ee6d08a02cb83) for your project

## Tasks
### Task 0. Simple helper function
<Details>
Write a function named index_range that takes two integer arguments page and page_size.

The function should return a tuple of size two containing a start index and an end index corresponding to the range of indexes to return in a list for those particular pagination parameters.

Page numbers are 1-indexed, i.e. the first page is page 1.

Sample output
```
root@2c462bd13a86:~/alx-backend/0x00-pagination# chmod u+x 0-main.py
root@2c462bd13a86:~/alx-backend/0x00-pagination# ./0-main.py
<class 'tuple'>
(0, 7)
<class 'tuple'>
(30, 45)
```
</Details>

### Task 1. Simple pagination
<Details>
Implement a method named get_page that takes two integer arguments page with default value 1 and page_size with default value 10.

You have to use this CSV file (same as the one presented at the top of the project)
Use assert to verify that both arguments are integers greater than 0.
Use index_range to find the correct indexes to paginate the dataset correctly and return the appropriate page of the dataset (i.e. the correct list of rows).
If the input arguments are out of range for the dataset, an empty list should be returned.

Sample output
```
root@2c462bd13a86:~/alx-backend/0x00-pagination# ./1-main.py
AssertionError raised with negative values
AssertionError raised with 0
AssertionError raised when page and/or page_size are not ints
[['2016', 'FEMALE', 'ASIAN AND PACIFIC ISLANDER', 'Olivia', '172', '1'], ['2016', 'FEMALE', 'ASIAN AND PACIFIC ISLANDER', 'Chloe', '112', '2'], ['2016', 'FEMALE', 'ASIAN AND PACIFIC ISLANDER', 'Sophia', '104', '3']]
[['2016', 'FEMALE', 'ASIAN AND PACIFIC ISLANDER', 'Emily', '99', '4'], ['2016', 'FEMALE', 'ASIAN AND PACIFIC ISLANDER', 'Mia', '79', '5']]
[]
```
</Details>

### Task 2. Hypermedia pagination
<Details>
Replicate code from the previous task.

Implement a get_hyper method that takes the same arguments (and defaults) as get_page and returns a dictionary containing the following key-value pairs:

* page_size: the length of the returned dataset page
* page: the current page number
* data: the dataset page (equivalent to return from previous task)
* next_page: number of the next page, None if no next page
* prev_page: number of the previous page, None if no previous page
* total_pages: the total number of pages in the dataset as an integer
Make sure to reuse get_page in your implementation.

You can use the math module if necessary.

Sample output
```
root@2c462bd13a86:~/alx-backend/0x00-pagination# ./2-main.py
{'page_size': 2, 'page': 1, 'data': [['2016', 'FEMALE', 'ASIAN AND PACIFIC ISLANDER', 'Olivia', '172', '1'], ['2016', 'FEMALE', 'ASIAN AND PACIFIC ISLANDER', 'Chloe', '112', '2']], 'next_page': 2, 'prev_page': None, 'total_pages': 9709}
---
{'page_size': 2, 'page': 2, 'data': [['2016', 'FEMALE', 'ASIAN AND PACIFIC ISLANDER', 'Sophia', '104', '3'], ['2016', 'FEMALE', 'ASIAN AND PACIFIC ISLANDER', 'Emma', '99', '4']], 'next_page': 3, 'prev_page': 1, 'total_pages': 9709}
---
{'page_size': 3, 'page': 100, 'data': [['2016', 'FEMALE', 'BLACK NON HISPANIC', 'Londyn', '14', '39'], ['2016', 'FEMALE', 'BLACK NON HISPANIC', 'Amirah', '14', '39'], ['2016', 'FEMALE', 'BLACK NON HISPANIC', 'McKenzie', '14', '39']], 'next_page': 101, 'prev_page': 99, 'total_pages': 6473}
---
{'page_size': 0, 'page': 3000, 'data': [], 'next_page': None, 'prev_page': 2999, 'total_pages': 195}
```
</Details>

### Task 3. Deletion-resilient hypermedia pagination
<Details>
Implement a get_hyper_index method with two integer arguments: index with a None default value and page_size with default value of 10.

The method should return a dictionary with the following key-value pairs:
index: the current start index of the return page. That is the index of the first item in the current page. For example if requesting page 3 with page_size 20, and no data was removed from the dataset, the current index should be 60.
next_index: the next index to query with. That should be the index of the first item after the last item on the current page.
page_size: the current page size
data: the actual page of the dataset
**Requirements/Behavior:**

* Use assert to verify that index is in a valid range.
* If the user queries index 0, page_size 10, they will get rows indexed 0 to 9 included.
* If they request the next index (10) with page_size 10, but rows 3, 6 and 7 were deleted, the user should still receive rows indexed 10 to 19 included.

Sample output
```
root@2c462bd13a86:~/alx-backend/0x00-pagination# ./3-main.py
AssertionError raised when out of range
Nb items: 19418
{'index': 3, 'data': [['2016', 'FEMALE', 'ASIAN AND PACIFIC ISLANDER', 'Emma', '99', '4'], ['2016', 'FEMALE', 'ASIAN AND PACIFIC ISLANDER', 'Emily', '99', '4']], 'page_size': 2, 'next_index': 5}
{'index': 5, 'data': [['2016', 'FEMALE', 'ASIAN AND PACIFIC ISLANDER', 'Mia', '79', '5'], ['2016', 'FEMALE', 'ASIAN AND PACIFIC ISLANDER', 'Charlotte', '59', '6']], 'page_size': 2, 'next_index': 7}
Nb items: 19417
{'index': 3, 'data': [['2016', 'FEMALE', 'ASIAN AND PACIFIC ISLANDER', 'Emily', '99', '4']], 'page_size': 2, 'next_index': 6}
{'index': 5, 'data': [['2016', 'FEMALE', 'ASIAN AND PACIFIC ISLANDER', 'Mia', '79', '5'], ['2016', 'FEMALE', 'ASIAN AND PACIFIC ISLANDER', 'Charlotte', '59', '6']], 'page_size': 2, 'next_index': 7}
root@2c462bd13a86:~/alx-backend/0x00-pagination# 
```
</Details>