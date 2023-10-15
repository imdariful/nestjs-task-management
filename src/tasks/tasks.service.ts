/* Task - Service */

import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './DTO/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = []; // defined an empty array for saving tasks.

  // get all the tasks from the database
  getAllTasks(): Task[] {
    return this.tasks;
  }

  // create task and push it to database
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(), // this to generate a unique id
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task); // push it to db here tasks array.

    return task; // return task to client
  }
}
