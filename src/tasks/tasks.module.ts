import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './providers/tasks.service';
import { TaskEntity } from './task.entity';
import { User } from 'src/users/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'src/auth/config/jwt.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity, User]),
    AuthModule,
    JwtModule.registerAsync(jwtConfig.asProvider()), // provides JwtService
    ConfigModule.forFeature(jwtConfig), // provides CONFIGURATION(jwt)
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
