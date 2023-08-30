const assert = require('assert');
const kue = require('kue');

const createPushNotificationsJobs = require('./8-job');

describe('createPushNotificationsJobs', () => {
  let queue;

  before(() => {
    queue = kue.createQueue({ redis: { host: '127.0.0.1', port: 6379 } });
    queue.testMode.enter();
  });

  after(() => {
    queue.testMode.exit();
    queue.shutdown(1000, () => {
      process.exit(0);
    });
  });

  it('should create push notification jobs', () => {
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account',
      },
      {
        phoneNumber: '4153518781',
        message: 'This is the code 4562 to verify your account',
      },
    ];

    createPushNotificationsJobs(jobs, queue);
    assert.equal(queue.testMode.jobs.length, jobs.length, 'Jobs should be added to the queue');
  });
});
