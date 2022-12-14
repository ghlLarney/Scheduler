export enum TestType {
  Add = "add",
  Remove = "remove",
  Get = "get",
  List = "list",
  Pause = "pause",
  Resume = "resume"
}

export interface Job {
  data: any;
  time: Date;
  id: JobId;
}

export interface TestCase {
  type: TestType;
  data?: any;
  index?: number;
  time?: number;
  after?: number
}

export type JobId = number | string;