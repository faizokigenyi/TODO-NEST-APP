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
  UseGuards,
  Req,
} from '@nestjs/common';
import { TasksService } from './providers/tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';
import { Request } from 'express';

@UseGuards(AccessTokenGuard) // Use the global guard
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  public async createTask(
    @Req() request: Request,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    const user = request[REQUEST_USER_KEY];
    return this.tasksService.createTask(user.sub, createTaskDto);
  }

  @Get()
  public async findAll(@Req() request: Request) {
    const user = request[REQUEST_USER_KEY];
    return this.tasksService.findAllByUserId(user.sub);
  }

  @Get(':id')
  public async findOne(
    @Req() request: Request,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const user = request[REQUEST_USER_KEY];
    const task = await this.tasksService.findOneByIdAndUser(id, user.sub);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  @Put(':id')
  public async updateTask(
    @Req() request: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const user = request[REQUEST_USER_KEY];
    return this.tasksService.updateTask(id, user.sub, updateTaskDto);
  }

  @Delete(':id')
  public async deleteTask(
    @Req() request: Request,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const user = request[REQUEST_USER_KEY];
    return this.tasksService.deleteTask(id, user.sub);
  }
}
