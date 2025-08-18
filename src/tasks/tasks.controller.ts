import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Get,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './providers/tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Controller('users/:userId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // Create a new task for a specific user
  @Post()
  public async createTask(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.createTask(userId, createTaskDto);
  }

  // Get all tasks for a specific user
  @Get()
  public async findAll(@Param('userId', ParseIntPipe) userId: number) {
    return await this.tasksService.findAllByUserId(userId);
  }

  // Get one task by ID for a specific user
  @Get(':id')
  public async findOne(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const task = await this.tasksService.findOneByIdAndUser(id, userId);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found for this user`);
    }
    return task;
  }

  // Update a task for a specific user
  @Put(':id')
  public async updateTask(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(id, userId, updateTaskDto);
  }

  // Delete a task for a specific user
  @Delete(':id')
  public async deleteTask(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.tasksService.deleteTask(id, userId);
  }
}
