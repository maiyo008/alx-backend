import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err}`);
});

client.on('connect', () => {
  console.log('Redis client connected to the server');
  client.quit();
});

client.hset('HolbertonSchools', 'Portland', 50, (err, reply) => {
    if (err) {
        console.error(`Error setting Portland`);
    } else {
        console.log(`Reply: ${reply}`);
    }
});
client.hset('HolbertonSchools', 'Seattle', 80, (err, reply) => {
    if (err) {
        console.error(`Error setting Seattle`);
    } else {
        console.log(`Reply: ${reply}`);
    }
});
client.hset('HolbertonSchools', 'New York', 20, (err, reply) => {
    if (err) {
        console.error(`Error setting New York`);
    } else {
        console.log(`Reply: ${reply}`);
    }
});
client.hset('HolbertonSchools', 'Bogota', 20, (err, reply) => {
    if (err) {
        console.error(`Error setting Bogota`);
    } else {
        console.log(`Reply: ${reply}`);
    }
});
client.hset('HolbertonSchools', 'Cali', 40, (err, reply) => {
    if (err) {
        console.error(`Error setting Cali`);
    } else {
        console.log(`Reply: ${reply}`);
    }
});
client.hset('HolbertonSchools', 'Paris', 2, (err, reply) => {
    if (err) {
        console.error(`Error setting Paris`);
    } else {
        console.log(`Reply: ${reply}`);
    }
});

client.hgetall('HolbertonSchools', (err, reply) => {
  if (err) {
    console.error(`Error retrieving hash value: ${err}`);
  } else {
    console.log(reply);
  }
});
