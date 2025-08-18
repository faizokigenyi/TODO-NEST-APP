import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './providers/users-service';
import { CreateUserProvider } from './providers/create-user.provider';

@Controller('users')
export class UsersController {
  constructor(
    /**inject users Service */
    private readonly createUserService: CreateUserProvider,
    private readonly usersService: UsersService,
  ) {}

  @Get(':id')
  public getUserById(@Param('id') id: string) {
    return this.usersService.findOneById(+id); // +id converts string to number
  }

  @Post()
  public createUsers(@Body() createUserDto: CreateUserDto) {
    return this.createUserService.createUser(createUserDto);
  }
}
