import { expect } from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './8-job';

describe('createPushNotificationsJobs', () => {
    let queue;

    beforeEach (() => {
        queue = kue.createQueue();
        queue.testMode.enter();
    });

    afterEach(() => {
        queue.testMode.exit();
    });

    it('should throw an error if jobs is not an array', () => {
        const invalidJobs = 'not an array';
        expect(() => createPushNotificationsJobs(invalidJobs, queue)).to.throw('Jobs is not an array');
    });

    it('should create jobs in the queue', () => {
        const jobs = [
            {
              phoneNumber: '1234567890',
              message: 'Test message 1',
            },
            {
              phoneNumber: '0987654321',
              message: 'Test message 2',
            },
          ];
        
        createPushNotificationsJobs(jobs, queue);
        expect(queue.testMode.jobs.length).to.equal(2);
    });

    it('should have correct job data in the queue', () => {
        const jobs = [
            {
              phoneNumber: '1234567890',
              message: 'Test message 1',
            },
          ];
        
        createPushNotificationsJobs(jobs, queue);
        const [job] = queue.testMode.jobs;
        expect(job.type).to.equal('push_notification_code_3');
        expect(job.data).to.deep.equal(jobs[0]);
    });
});
