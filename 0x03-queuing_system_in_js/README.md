# 0x03-queuing_system_in_js
In JavaScript, a queueing system, often referred to as a message queue or task queue, is a mechanism for managing and executing asynchronous tasks or messages in a specific order. It helps in organizing and processing tasks in a way that ensures proper sequencing, concurrency control, and often, distributed communication between different parts of an application or system.

## Environment setup
* Ubuntu 18.04,
* Node 12.x
* Redis 5.0.7 (Or any latest stable Redis version)

## How to install REDIS
```
$ wget http://download.redis.io/releases/redis-6.0.10.tar.gz
$ tar xzf redis-6.0.10.tar.gz
$ cd redis-6.0.10
$ make
```
**Starting REDIS in the background**
Remember to navigate to the redis downloded repo
```
root@2c462bd13a86:~/redis-6.0.10# ./src/redis-server > /dev/null 2>&1 &
[1] 27896
root@2c462bd13a86:~/redis-6.0.10# 
```

**Check if REDIS process is running**
```
root@2c462bd13a86:~/alx-backend/0x03-queuing_system_in_js# ps ax | grep redis-server
27896 pts/2    Sl     0:00 ./src/redis-server *:6379
28012 pts/1    S+     0:00 grep --color=auto redis-server
```
From the snippet REDIS is listening on its default port 6379

## Tasks
### Task 1
* Install Node Redis client
* Write a script that connects to Redis running on my machine
file: `0-redis_client.js`

Output samples
<Details>

Sample output when redis server is not running
```
root@2c462bd13a86:~/alx-backend/0x03-queuing_system_in_js# npm run dev 0-redis_client.js 

> queuing_system_in_js@1.0.0 dev /root/alx-backend/0x03-queuing_system_in_js
> nodemon --exec babel-node --presets @babel/preset-env "0-redis_client.js"

[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `babel-node --presets @babel/preset-env 0-redis_client.js`
Redis client not connected to the server: TypeError: client.connect is not a function
Redis client not connected to the server: Error: Redis connection to 127.0.0.1:6379 failed - connect ECONNREFUSED 127.0.0.1:6379
Redis client not connected to the server: Error: Redis connection to 127.0.0.1:6379 failed - connect ECONNREFUSED 127.0.0.1:6379
Redis client not connected to the server: Error: Redis connection to 127.0.0.1:6379 failed - connect ECONNREFUSED 127.0.0.1:6379
Redis client not connected to the server: Error: Redis connection to 127.0.0.1:6379 failed - connect ECONNREFUSED 127.0.0.1:6379
Redis client not connected to the server: Error: Redis connection to 127.0.0.1:6379 failed - connect ECONNREFUSED 127.0.0.1:6379
Redis client not connected to the server: Error: Redis connection to 127.0.0.1:6379 failed - connect ECONNREFUSED 127.0.0.1:6379
Redis client not connected to the server: Error: Redis connection to 127.0.0.1:6379 failed - connect ECONNREFUSED 127.0.0.1:6379
^C
```

Sample output when redis server is running 
```
root@2c462bd13a86:~/alx-backend/0x03-queuing_system_in_js# npm run dev 0-redis_client.js 

> queuing_system_in_js@1.0.0 dev /root/alx-backend/0x03-queuing_system_in_js
> nodemon --exec babel-node --presets @babel/preset-env "0-redis_client.js"

[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `babel-node --presets @babel/preset-env 0-redis_client.js`
Redis client not connected to the server: TypeError: client.connect is not a function
[nodemon] restarting due to changes...
[nodemon] starting `babel-node --presets @babel/preset-env 0-redis_client.js`
Redis client connected to the server
^C
```
</Details>
