/* Task - Service */

import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './DTO/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = []; // defined an empty array for saving tasks.

  /**
   * Get all tasks
   * @returns {Object[]} - The tasks object array.
   */
  getAllTasks(): Task[] {
    return this.tasks;
  }

  /**
   * Get task by id
   * @param id - The task id
   * @returns {Object} - The tasks object
   */
  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  /**
   * Create task
   * @returns  {Object} - The task object.
   */
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

  /**
   * Delete task by id
   * @param id - The task id
   * @returns {Object[]} - The tasks object array
   */
  deleteTaskById(id: string): Task[] {
    const updatedTask = this.tasks.filter((task) => task.id !== id);
    this.tasks = updatedTask;
    return this.tasks;
  }
}
