import { createClient } from "redis";

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

function displaySchoolValue(schoolName) {
    client.get(schoolName, (err, value) => {
        if (err) {
            console.error(`Error getting ${schoolName}: ${err}`);
        } else {
            console.log(`${value}`);
            client.quit();
        }
    })
}

connectToRedis()

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
