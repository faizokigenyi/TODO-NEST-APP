import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/signin.dto';

import { RefreshTokenDto } from './dtos/refresh.token.dto';
import { SignInProvider } from './providers/sign-in.provider';
import { SignUpProvider } from './providers/sign-up.provider';
import { SignUpDto } from './dtos/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(
    /*
     * Injecting Auth Service
     */
    private readonly authService: AuthService,

    /*
     * Injecting SignIn Provider
     * This is not used in this controller but can be used for other purposes
     */
    private readonly signUpProvider: SignUpProvider,

    private readonly signInProvider: SignInProvider,
  ) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  public signIn(@Body() signInDto: SignInDto) {
    return this.signInProvider.signIn(signInDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  public signUp(@Body() signUpDto: SignUpDto) {
    return this.signUpProvider.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK) // changed since the default is 201
  @Post('refresh-tokens')
  refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto);
  }
}
