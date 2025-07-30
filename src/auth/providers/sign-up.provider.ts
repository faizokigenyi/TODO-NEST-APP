// auth/providers/signup.provider.ts
import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateUserProvider } from 'src/users/providers/create-user.provider';
import { FindOneUserByEmailProvider } from 'src/users/providers/find-one-user-by-email.provider';
import { HashingProvider } from './hashing.provider';
import { SignUpDto } from '../dtos/signup.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class SignUpProvider {
  constructor(
    @Inject(forwardRef(() => CreateUserProvider))
    private readonly createUserProvider: CreateUserProvider,

    @Inject(forwardRef(() => FindOneUserByEmailProvider))
    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,

    private readonly hashingProvider: HashingProvider,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const existingUser = await this.findOneUserByEmailProvider.findOneByEmail(
      signUpDto.email,
    );

    if (existingUser) {
      throw new ConflictException('User already exists with this email');
    }

    const hashedPassword = await this.hashingProvider.hashPassword(
      signUpDto.password,
    );

    return this.createUserProvider.createUser({
      ...signUpDto,
      password: hashedPassword,
    });
  }
}
