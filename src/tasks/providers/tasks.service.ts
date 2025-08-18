import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from '../task.entity';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create a task for a specific user
  public async createTask(userId: number, createTaskDto: CreateTaskDto) {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user)
        throw new NotFoundException(`User with ID ${userId} not found`);

      const task = this.taskRepository.create({
        ...createTaskDto,
        completed: false,
        user,
      });

      return this.taskRepository.save(task);
    } catch {
      throw new InternalServerErrorException('Failed to create task');
    }
  }

  // Find all tasks for a user
  public async findAllByUserId(userId: number) {
    try {
      return this.taskRepository.find({
        where: { user: { id: userId } },
        relations: ['user'],
      });
    } catch {
      throw new InternalServerErrorException('Failed to retrieve tasks');
    }
  }

  // Find one task by ID and user
  public async findOneByIdAndUser(taskId: number, userId: number) {
    const task = await this.taskRepository.findOne({
      where: { id: taskId, user: { id: userId } },
      relations: ['user'],
    });

    if (!task)
      throw new NotFoundException(
        `Task with ID ${taskId} not found for this user`,
      );

    return task;
  }

  // Update a task for a specific user
  public async updateTask(
    taskId: number,
    userId: number,
    updateTaskDto: UpdateTaskDto,
  ) {
    const task = await this.findOneByIdAndUser(taskId, userId);

    Object.assign(task, updateTaskDto); // Merge updates
    try {
      return this.taskRepository.save(task);
    } catch {
      throw new InternalServerErrorException('Failed to update task');
    }
  }

  // Delete a task for a specific user
  public async deleteTask(taskId: number, userId: number) {
    const task = await this.findOneByIdAndUser(taskId, userId);

    try {
      await this.taskRepository.remove(task);
      return { message: 'Task deleted successfully' };
    } catch {
      throw new InternalServerErrorException('Failed to delete task');
    }
  }
}
