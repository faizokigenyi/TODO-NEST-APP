import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TaskEntity } from './tasks/task.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load .env automatically

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'), // Secure URL
        entities: [TaskEntity],
        autoLoadEntities: true,
        synchronize: true, // ⚠️ true for dev only — use migrations in prod
      }),
    }),

    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
