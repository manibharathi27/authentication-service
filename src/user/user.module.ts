import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDto } from './dto/userDto';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([UserDto])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule { }