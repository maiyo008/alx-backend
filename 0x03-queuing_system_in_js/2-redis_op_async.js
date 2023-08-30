import { createClient } from "redis";
import util from 'util';

const client = createClient();
const asyncGet = util.promisify(client.get).bind(client);

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

function setNewSchool(schoolName, value) {
    client.set(schoolName, value, (err, reply) => {
        if (err) {
            console.error(`Error setting ${schoolName}: ${err}`);
        } else {
            console.log(`Reply: ${reply}`);
            client.quit();
        }
    });
}

async function displaySchoolValue(schoolName) {
    try {
        const value = await asyncGet(schoolName);
        console.log(`${value}`);
        client.quit();
    } catch (err) {
        console.error(`Error getting ${schoolName}: ${err}`)
    }
}

connectToRedis()

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
