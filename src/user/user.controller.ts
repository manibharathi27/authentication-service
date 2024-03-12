import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserDto } from './dto/userDto';
import { UserService } from './user.service';
import { Public } from 'src/public.decorator';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Public()
    @Post()
    @ApiBody({
        type: UserDto,
        description: 'Json structure for user object'
     })
    create(@Body() user: UserDto) {
        return this.userService.create(user);
    }

    @Get()
    @ApiBearerAuth('access-token')
    findAll() {
        return this.userService.findUsers();
    }

    @Get(':id')
    findById(@Param('id') id: number) {
        return this.userService.findUserById(id);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.userService.deleteUser(id);
    }
}