/* Task - Controller */

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './DTO/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  /**
   * Route: GET /tasks
   * Description: Retrieve a list of all tasks.
   * Request Body: { title: string, description: string }
   */
  @Get()
  @HttpCode(200)
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  /**
   * Route: POST /tasks
   * Description: Create a new task.
   * Request Body: { title: string, description: string }
   */
  @Post()
  @HttpCode(201)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  /**
   * Route: PATCH /tasks/:id/status
   * Description: Update a exiting task.
   * Request Body: { status: string }
   */
  @Patch(':id/status')
  @HttpCode(200)
  updateTaskById(@Param('id') id: string, @Body('status') status: TaskStatus) {
    return this.tasksService.updateTaskById(id, status);
  }

  /**
   * Route: GET /tasks/:id
   * Description: Retrieve a single task by id.
   * @param {string} id - The unique identifier of the task.
   */
  @Get(':id')
  @HttpCode(200)
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  /**
   * Route: DELETE /tasks/:id
   * Description: Delete a task by id.
   * @param {string} id - The unique identifier of the task.
   */
  @Delete(':id')
  @HttpCode(200)
  deleteTaskById(@Param('id') id: string): Task[] {
    return this.tasksService.deleteTaskById(id);
  }
}
