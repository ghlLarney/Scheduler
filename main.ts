// import Queue from './queue';
import Queue from './solution';
import { JobId, Job, TestCase, TestType } from './models';
import testCases from './test-config';

let queue = new Queue();

queue.on("job", (job: Job) => {
  console.log("Got job", job);
})

let staticDate = new Date();

const processTestCase = (test: TestCase) => {
  switch(test.type)
    {
      case TestType.Add:
        let dt = new Date(staticDate);
        
        if (test.time) {
          dt.setSeconds(dt.getSeconds() + test.time);
        }
        let jobId = queue.addJob(test.data, dt);
        console.log("Added job with id", jobId)
        jobIds.push(jobId);
        break;
      case TestType.Remove:
        if (!test.index) break;
        let removedJob = queue.removeJob(jobIds[test.index]);
        
        if (removedJob != undefined) {
          console.log("Removed job with id", removedJob.id, removedJob);
          jobIds.splice(test.index, 1);
        }
        break;
      case TestType.List:
        let allJobs = queue.listJobs();
        console.log("List Jobs", allJobs);
        break;
      case TestType.Get:
        if (!test.index) break;
        let job = queue.getJob(jobIds[test.index]);
        console.log("Get Job", job);
        break;
      case TestType.Pause:
        queue.pauseQueue();
        console.log("Pause, Queue Status", !queue.isRunning ? "Paused" : "Active");
        break;
      case TestType.Resume:
        queue.resumeQueue();
        console.log("Resume, Queue Status", !queue.isRunning ? "Paused" : "Active");
        break;
    }
}

//emulate test cases
let jobIds: JobId[] = [];
for (let test of testCases) {
  if (test.after) {
    setTimeout(() => {
      processTestCase(test);
    }, test.after * 1000);
  } else {
    processTestCase(test);
  }
}
