/* Task - Controller */

import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './DTO/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // how get tasks req will be handled
  // example url: http://localhost:3000/tasks/
  @Get()
  @HttpCode(200)
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  // get task by id
  // example url: http://localhost:3000/tasks/:id
  @Get(':id')
  @HttpCode(200)
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  // how create task post req will be handled
  // example url: http://localhost:3000/tasks/
  @Post()
  @HttpCode(201)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }
}
