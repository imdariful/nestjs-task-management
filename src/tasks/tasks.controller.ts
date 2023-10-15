/* Task - Controller */

import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './DTO/create-task.dto';

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
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }
}
