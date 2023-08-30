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

### Task 2
* Set values to Redis
* Get values from Redis
file: `1-redis_op.js`

Sample output
<Details>

```
root@2c462bd13a86:~/alx-backend/0x03-queuing_system_in_js# npm run dev 1-redis_op.js 

> queuing_system_in_js@1.0.0 dev /root/alx-backend/0x03-queuing_system_in_js
> nodemon --exec babel-node --presets @babel/preset-env "1-redis_op.js"

[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `babel-node --presets @babel/preset-env 1-redis_op.js`
Redis client connected to the server
School
Reply: OK
100
[nodemon] clean exit - waiting for changes before restart
^C
```
</Details>

### Task 3
* Async operations on getting data from Redis
File: `2-redis_op_async.js`
Sample output
<Details>

```
[nodemon] clean exit - waiting for changes before restart
[nodemon] restarting due to changes...
[nodemon] starting `babel-node --presets @babel/preset-env 2-redis_op_async.js`
Redis client connected to the server
Reply: OK
School
100
[nodemon] clean exit - waiting for changes before restart
^C
```
</Details>

### Task 4 
* Create Hash
* Display Hash
File: `4-redis_advanced_op.js`
Sample output
<Details>

```
[nodemon] restarting due to changes...
[nodemon] starting `babel-node --presets @babel/preset-env 4-redis_advanced_op.js`
Redis client connected to the server
Reply for Portland: 1
Reply for Seattle: 1
Reply for New York: 1
Reply for Bogota: 1
Reply for Cali: 1
Reply for Paris: 1
Hash value:
{
  Portland: '50',
  Seattle: '80',
  'New York': '20',
  Bogota: '20',
  Cali: '40',
  Paris: '2'
}
```

**Note that when the same program is repeated we have values of 0 for the replies

```
Redis client connected to the server
Reply: 0
Reply: 0
Reply: 0
Reply: 0
Reply: 0
Reply: 0
Hash value:
{
  Portland: '50',
  Seattle: '80',
  'New York': '20',
  Bogota: '20',
  Cali: '40',
  Paris: '2'
}
```
</Details>

### Task 5
* Subscribe client
* Publish client 
files: `5-subscriber.js` and `5-publisher.js`
Sample output
<Details>

On terminal 1(Subscriber) before message is sent
```
root@2c462bd13a86:~/alx-backend/0x03-queuing_system_in_js# npm run dev 5-subscriber.js 

> queuing_system_in_js@1.0.0 dev /root/alx-backend/0x03-queuing_system_in_js
> nodemon --exec babel-node --presets @babel/preset-env "5-subscriber.js"

[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `babel-node --presets @babel/preset-env 5-subscriber.js`
Redis client connected to the server
```

on terminal 2(Publisher)
```
root@2c462bd13a86:~/alx-backend/0x03-queuing_system_in_js# npm run dev 5-publisher.js 

> queuing_system_in_js@1.0.0 dev /root/alx-backend/0x03-queuing_system_in_js
> nodemon --exec babel-node --presets @babel/preset-env "5-publisher.js"

[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `babel-node --presets @babel/preset-env 5-publisher.js`
Redis client connected to the server
About to send Holberton Student #1 starts course
About to send Holberton Student #2 starts course
About to send KILL_SERVER
About to send Holberton Student #3 starts course
```

Back to terminal 1(Subscriber) after message is sent
```
root@2c462bd13a86:~/alx-backend/0x03-queuing_system_in_js# npm run dev 5-subscriber.js 

> queuing_system_in_js@1.0.0 dev /root/alx-backend/0x03-queuing_system_in_js
> nodemon --exec babel-node --presets @babel/preset-env "5-subscriber.js"

[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `babel-node --presets @babel/preset-env 5-subscriber.js`
Redis client connected to the server
Holberton Student #1 starts course
Holberton Student #2 starts course
KILL_SERVER
[nodemon] clean exit - waiting for changes before restart
```
</Details>

### Task 6
* Create a queue using Kue
File: `6-job_creator.js`

Sample output
<Details>

```
root@2c462bd13a86:~/alx-backend/0x03-queuing_system_in_js# npm run dev 6-job_creator.js 

> queuing_system_in_js@1.0.0 dev /root/alx-backend/0x03-queuing_system_in_js
> nodemon --exec babel-node --presets @babel/preset-env "6-job_creator.js"

[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `babel-node --presets @babel/preset-env 6-job_creator.js`
Notification job created: 1
```
</Details>

### Task 7
* Create a job processor
File: `6-job_processor.js`
Sample output
<Details>

Terminal 2 (Job processor)
```
 nodemon --exec babel-node --presets @babel/preset-env "6-job_processor.js"

[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `babel-node --presets @babel/preset-env 6-job_processor.js`
[nodemon] restarting due to changes...
[nodemon] starting `babel-node --presets @babel/preset-env 6-job_processor.js`
Job processor is running...
[nodemon] restarting due to changes...
[nodemon] starting `babel-node --presets @babel/preset-env 6-job_processor.js`
Sending notification to 0726987451, with message: Hello
Sending notification to 0726987451, with message: Hello
```

terminal 1 (Job creator)
```
[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `babel-node --presets @babel/preset-env 6-job_creator.js`
Notification job created: 3
Notification job completed
```
</Details>