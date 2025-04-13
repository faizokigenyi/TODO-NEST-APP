import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { TaskEntity } from './tasks/task.entity';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        imports: [],
        inject: [],
        // TypeORM configuration
        type: 'postgres',
        entities: [TaskEntity],
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '1234',
        synchronize: true,
        database: 'todo-list',
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
