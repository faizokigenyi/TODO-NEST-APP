import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from '../task.entity';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { PatchTaskDto } from '../dtos/Patch-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  public async createTask(createTaskDto: CreateTaskDto) {
    try {
      const task = this.taskRepository.create(createTaskDto);
      return await this.taskRepository.save(task);
    } catch {
      throw new InternalServerErrorException('Failed to create task');
    }
  }

  public async findAll() {
    try {
      return await this.taskRepository.find();
    } catch {
      throw new InternalServerErrorException('Failed to retrieve tasks');
    }
  }

  public async findOneById(id: number) {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: number, dto: PatchTaskDto) {
    const user = await this.taskRepository.preload({
      id,
      ...dto,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return await this.taskRepository.save(user);
  }

  public async delete(id: number) {
    const result = await this.taskRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
