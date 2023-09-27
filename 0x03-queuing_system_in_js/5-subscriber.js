import { createClient } from "redis";

const subscriber = createClient();

subscriber.on('error', (err) => {
    console.error(`Redis client not connected to the server: ${err}`);
});

subscriber.on('connect', () => {
    console.log('Redis client connected to the server');
    subscriber.subscribe('Holberton school channel');
});

subscriber.on('message', (channel, message) => {
    console.log(`Message recieved: ${message}`);
    if (message === 'KILL_SERVER') {
        subscriber.unsubscribe('Holberton school channel');
        subscriber.quit();
    }
});
