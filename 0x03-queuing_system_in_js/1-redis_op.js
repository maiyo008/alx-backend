import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err}`);
});

client.on('connect', () => {
  console.log('Redis client connected to the server');
  client.quit();
});

function setNewSchool(schoolName, value) {
    client.set(schoolName, value, (err, reply) => {
      if (err) {
        console.error(`Error setting value for ${schoolName}: ${err}`);
      } else {
        //console.log(`Value set for ${schoolName}`);
        console.log(`Reply: ${reply}`);
      }
    });
  }
  
function displaySchoolValue(schoolName) {
    client.get(schoolName, (err, reply) => {
      if (err) {
        console.error(`Error retrieving value for ${schoolName}: ${err}`);
      } else {
        console.log(`${reply}`);
      }
    });
  };

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');