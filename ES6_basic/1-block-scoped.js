export default function taskBlock(trueOrFalse) {
    const task = false;
    const task2 = true;
  
    if (trueOrFalse) {
      const task = true; // This task is only scoped to this block
      const task2 = false; // This task2 is only scoped to this block
    }
  
    return [task, task2];
  }
  