import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './providers/tasks.service';
import { GetTasksParamDto } from './dtos/get-tasks-param.dto';
import { CreateTaskDto } from './dtos/create-task.dto';
import { PatchTaskDto } from './dtos/Patch-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  public getAllTasks() {
    return this.tasksService.findAll();
  }

  @Get('/:id')
  public getTaskById(
    @Param('id', new ParseIntPipe())
    id: number,
  ) {
    return this.tasksService.findOneById(id);
  }

  @Post()
  public createPost(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id')
  public patchTask(
    @Param('id', new ParseIntPipe())
    id: number,
    @Body()
    patchUserDto: PatchTaskDto,
  ) {
    return this.tasksService.update(id, patchUserDto);
  }

  @Delete(':id')
  public deleteTask(@Param() getTaskParamDto: GetTasksParamDto) {
    return this.tasksService.delete(getTaskParamDto.id);
  }
}
