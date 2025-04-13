import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './providers/tasks.service';
import { TaskEntity } from './task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [TypeOrmModule.forFeature([TaskEntity])],
})
export class TasksModule {}
