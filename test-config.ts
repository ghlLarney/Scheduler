import { TestCase } from './models';
  
export default [
  {
    type: 'add',
    data: 'Interview with Rahul',
    time: 30
  },
  {
    type: 'add',
    data: 'Sleep off!',
    time: 60
  },
  {
    type: 'remove',
    index: 2,
    after: 31
  },
  {
    type: 'add',
    data: 'Dial 911',
    time: 80
  },
  {
    type: 'pause',
    after: 65
  },
  {
    type: 'add',
    data: 'Bake the cake!',
    time: 0
  },
  {
    type: 'add',
    data: 'Check calendar',
    time: -10
  },
  {
    type: 'resume',
    after: 85
  },
  {
    type: 'list',
    after: 90
  }
] as TestCase[]