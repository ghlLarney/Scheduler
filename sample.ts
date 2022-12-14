import Queue from './queue'

let queue = new Queue()
let dt = new Date();
dt.setHours(dt.getHours() + 2);
queue.addJob("Wish happy birthday", dt)


queue.on('job', (data) => {
  console.log("data", data)
})