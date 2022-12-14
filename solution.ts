import EventEmitter from "events";
import { JobId, Job } from './models';

export default class Queue extends EventEmitter {
  private jobId: number;
  private jobs: Job[];
  private pausedJobs: Job[];
  private jobTimeouts: {timeout: NodeJS.Timer, id: JobId} [];
  isRunning: boolean;
  
  constructor() {
    super();
    this.jobId = 0;
    this.jobs = [];
    this.isRunning = true;
    this.jobTimeouts = [];
    this.pausedJobs = [];
  }
  
  private generateJobId(): JobId {
    //Logic to generate job id goes here
    this.jobId++;
    return this.jobId;
  }

  private removeTimeout(jobId: JobId) {
    let index = this.jobTimeouts.findIndex(jobTimeout => jobTimeout.id == jobId);
    if (index == -1) return;
    clearTimeout(this.jobTimeouts[index].timeout);
    this.jobTimeouts.splice(index, 1);
  }
  
  public addJob(data: any, time: Date): JobId {
    //Logic to add a job goes here
    let jobId: JobId = this.generateJobId();
    let currentTime = new Date().getTime();
    let scheduleTime = time.getTime();
    let timeDiff = Math.max(0, scheduleTime - currentTime);
    let job: Job = {
        data,
        id: jobId,
        time
    }
    let timeout = setTimeout(() => {
      this.emit("job", job.data);
      let jobIndexToRemove = this.jobs.findIndex(job1 => job1.id == job.id);
      this.jobs.splice(jobIndexToRemove, 1);
    }, timeDiff);
    this.jobs.push(job);
    this.jobTimeouts.push({timeout, id: jobId});
    return jobId;
  }
  
  public getJob(jobId: JobId): Job | undefined {
    //Logic to get a job goes here
    if (this.isRunning) {
      let index = this.jobs.findIndex(job => job.id == jobId);
      if (index == -1) return undefined;
      return this.jobs[index];
    } else {
      let index = this.pausedJobs.findIndex(job => job.id == jobId);
      if (index == -1) return undefined;
      return this.pausedJobs[index];
    }
  }
  
  public removeJob(jobId: JobId): Job | undefined {
    //Logic to delete a job goes here
    if (this.isRunning) {
      let index = this.jobs.findIndex(job => job.id == jobId);
      
      if (index == -1) return undefined;
      this.removeTimeout(jobId);
      return this.jobs.splice(index, 1)[0];
    } else {
      let index = this.pausedJobs.findIndex(job => job.id == jobId);
      if (index == -1) return undefined;
      return this.pausedJobs.splice(index, 1)[0];
    }
  }
  
  public listJobs(): Array<Job> {
    //Logic to get job list goes here
    return this.isRunning ? this.jobs : this.pausedJobs;
  }
  
  public pauseQueue() {
    //Logic to pause queue goes here
    this.isRunning = false;
    this.pausedJobs = [];
    for (let job of this.jobs) {
      this.removeTimeout(job.id);
      this.pausedJobs.push(Object.assign({}, job));
    }
    this.jobs = [];
  }
  
  public resumeQueue() {
    //Logic to resume queue goes here
    this.isRunning = true;
    this.jobs = [];
    for (let job of this.pausedJobs) {
      this.addJob(job.data, job.time);
    }
    this.pausedJobs = [];
  }
}