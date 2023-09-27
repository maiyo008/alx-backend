import {createClient} from 'redis';

async function connectToRedis() {
    try{
        const client = await createClient();
            client.on('error', err => console.log("Redis client not connected to the server: ",err.message));
            client.on('connect', () => console.log("Redis client connected to the server"));
            //console.log('Redis client connected to the server');
    } catch (err) {
        console.error(`Redis client not connected to the server: ${err}`);
    }
};

connectToRedis();
