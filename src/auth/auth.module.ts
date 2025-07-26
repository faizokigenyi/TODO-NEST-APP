import { Module } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { AuthController } from './auth.controller';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { forwardRef } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { SignInProvider } from './providers/sign-in.provider';

@Module({
  providers: [
    AuthService,
    SignInProvider,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
  ],
  controllers: [AuthController],
  imports: [forwardRef(() => UsersModule)],
  exports: [AuthService, HashingProvider],
})
export class AuthModule {}
