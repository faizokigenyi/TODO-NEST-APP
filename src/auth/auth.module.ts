import { Module } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { AuthController } from './auth.controller';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { forwardRef } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { SignInProvider } from './providers/sign-in.provider';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { GenerateTokensProvider } from './providers/generate-tokens.provider';
import { RefreshTokensProvider } from './providers/refresh-tokens.provider';
import { SignUpProvider } from './providers/sign-up.provider';
@Module({
  providers: [
    AuthService,
    SignInProvider,
    SignUpProvider,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
    GenerateTokensProvider,
    RefreshTokensProvider,
  ],
  controllers: [AuthController],
  imports: [
    forwardRef(() => UsersModule),
    /**This jwtConfig.asProvider helps to avoid extra boiler plate code */
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  exports: [AuthService, HashingProvider],
})
export class AuthModule {}
