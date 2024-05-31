export default function taskBlock(trueOrFalse) {
    let task = false;
    let task2 = true;
  
    if (trueOrFalse) {
      let task = true; // This task is only scoped to this block
      let task2 = false; // This task2 is only scoped to this block
    }
  
    return [task, task2];
  }
  