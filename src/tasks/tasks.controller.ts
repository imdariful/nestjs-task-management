/* Task - Controller */

import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // how get tasks req will be handled
  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  // how create task post req will be handled
  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    return this.tasksService.createTask(title, description);
  }
}
