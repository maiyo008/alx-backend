import { createClient } from 'redis';

const subscriber = createClient();

subscriber.on('connect', () => {
  console.log('Redis client connected to the server');
});

subscriber.on('error', err => {
  console.error(`Redis client not connected to the server: ${err}`);
});

subscriber.on('message', (channel, message) => {
  if (channel === 'holberton school channel') {
    console.log(message);

    if (message === 'KILL_SERVER') {
      subscriber.unsubscribe();
      subscriber.quit();
    }
  }
});

subscriber.subscribe('holberton school channel');
