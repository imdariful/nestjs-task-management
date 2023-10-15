/* Task - Service */

import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './DTO/create-task.dto';
import { CreateFilterTaskDto } from './DTO/create-filter-task.dto';

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
   * Get all filtered tasks
   * @returns {Object[]} - The tasks object array.
   */
  filterTasks(filterTaskDto: CreateFilterTaskDto): Task[] {
    const { status, search } = filterTaskDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }

        return false;
      });
    }

    return tasks;
  }

  /**
   * Get task by id
   * @param id - The task id
   * @returns {Object} - The tasks object
   */
  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      // throw new NotFoundException(); or,
      throw new NotFoundException(`Task with id: ${id} not found.`);
    }
    return found;
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
   * Update task by id
   * @param id - The task id
   * @returns {Object[]} - The tasks object array
   */
  updateTaskById(id: string, status: TaskStatus): Task[] {
    const updatedTask: Task[] = this.tasks.map((task) => {
      if (task.id === id) {
        return {
          id: task?.id,
          title: task?.title,
          description: task?.description,
          status: status,
        };
      } else {
        return task;
      }
    });
    this.tasks = updatedTask;
    return this.tasks;
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
