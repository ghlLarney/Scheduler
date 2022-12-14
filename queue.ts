import EventEmitter from "events";
import { JobId, Job } from './models'
import * as uuid from 'uuid'

export default class Queue extends EventEmitter {
  constructor() {
    super();
  }
  private generateJobId(): JobId {
    //Logic to generate job id goes here
    let id = uuid()

    return 0;
  }
  public addJob(data: any, time: Date): JobId {
    //Logic to add a job goes here
    return 0;
  }
  public getJob(jobId: JobId): Job {
    //Logic to get a job goes here
    return null
  }
  public removeJob(jobId: JobId): boolean {
    //Logic to delete a job goes here
    return true
  }
  public listJobs(): Array<Job> {
    //Logic to get job list goes here
    return []
  }
  public pauseQueue() {
    //Logic to pause queue goes here
  }
  public resumeQueue() {
    //Logic to resume queue goes here
  }
}