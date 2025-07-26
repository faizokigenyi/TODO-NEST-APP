import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users-service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';

@Module({
  controllers: [UsersController],
  providers: [UsersService, CreateUserProvider, FindOneUserByEmailProvider],
  exports: [UsersService], // Exporting empty array as no providers are defined yet
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)], // Importing empty array as no modules are defined yet
})
export class UsersModule {}
