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

connectToRedis();
