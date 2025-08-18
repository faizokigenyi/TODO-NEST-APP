import {
  Inject,
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
  forwardRef,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users-service';
import { SignInDto } from '../dtos/signin.dto';
import { HashingProvider } from './hashing.provider';
import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class SignInProvider {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly hashingProvider: HashingProvider,

    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  public async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findOneByEmail(signInDto.email);
    console.log('user:', user);

    if (!user) {
      throw new UnauthorizedException('User cannot be found with this email');
    }

    let isPasswordValid = false;
    try {
      isPasswordValid = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      console.error('Error comparing password:', error);
      throw new InternalServerErrorException('Could not validate credentials');
    }

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // Get the tokens
    const tokens = await this.generateTokensProvider.generateTokens(user);

    // Return tokens + userId
    return {
      ...tokens,
      userId: user.id,
      userName: user.firstName, // optional, useful for greeting
    };
  }
}
