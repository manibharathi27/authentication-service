import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/userDto';

@Injectable()
export class UserService {
  private readonly users: UserDto[] = [];

  create(user: UserDto) {
    this.users.push(user);
  }

  findAll(): UserDto[] {
    return this.users;
  }
}