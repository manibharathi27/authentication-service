import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserDto } from './dto/userDto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    create(@Body() user:UserDto) {
      return this.userService.create(user);
    }
  
    @Get()
    findAll() {
        return this.userService.findAll();
    }
  
    @Get(':id')
    findById(@Param('id') id: string) {
      return `This action returns a #${id} cat`;
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() user: UserDto) {
      return `This action updates a #${id} cat`;
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return `This action removes a #${id} cat`;
    }
}