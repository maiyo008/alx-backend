import { createClient } from 'redis';

const client = createClient();

client.on('error', err => {
  console.error(`Redis client not connected to the server: ${err}`);
});

async function connectToRedis() {
  try {
    client.on('connect', () => {
      console.log('Redis client connected to the server');
    });
  } catch (err) {
    console.error(`Redis client not connected to the server: ${err}`);
  }
}

function createHash() {
  client.hset('HolbertonSchools', 'Portland', 50, (err, reply) => {
    if (err) {
      console.error(`Error setting Portland: ${err}`);
    } else {
      console.log(`Reply: ${reply}`);
    }
  });
  
  client.hset('HolbertonSchools', 'Seattle', 80, (err, reply) => {
    if (err) {
      console.error(`Error setting Seattle: ${err}`);
    } else {
      console.log(`Reply: ${reply}`);
    }
  });
  
  client.hset('HolbertonSchools', 'New York', 20, (err, reply) => {
    if (err) {
      console.error(`Error setting New York: ${err}`);
    } else {
      console.log(`Reply: ${reply}`);
    }
  });
  
  client.hset('HolbertonSchools', 'Bogota', 20, (err, reply) => {
    if (err) {
      console.error(`Error setting Bogota: ${err}`);
    } else {
      console.log(`Reply: ${reply}`);
    }
  });
  
  client.hset('HolbertonSchools', 'Cali', 40, (err, reply) => {
    if (err) {
      console.error(`Error setting Cali: ${err}`);
    } else {
      console.log(`Reply: ${reply}`);
    }
  });
  
  client.hset('HolbertonSchools', 'Paris', 2, (err, reply) => {
    if (err) {
      console.error(`Error setting Paris: ${err}`);
    } else {
      console.log(`Reply: ${reply}`);
    }
  });
}


function displayHash() {
  client.hgetall('HolbertonSchools', (err, reply) => {
    if (err) {
      console.error(`Error getting hash: ${err}`);
    } else {
      console.log('Hash value:');
      console.log(reply);
      client.quit();
    }
  });
}

connectToRedis();

createHash();
displayHash();
