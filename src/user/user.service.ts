import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/userDto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserDto)
        private usersRepository: Repository<UserDto>,
    ) { }
    async create(user: UserDto): Promise<UserDto | null> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        return this.usersRepository.save(user);
    }

    findUserByName(userName: string): Promise<UserDto | null> {
        return this.usersRepository.findOneBy({ userName });
    }

    findUsers(): Promise<UserDto[]> {
        return this.usersRepository.find();
    }

    findUserById(id: number): Promise<UserDto | null> {
        return this.usersRepository.findOneBy({ id });
    }

    async deleteUser(id: number) {
        const user = await this.findUserById(id);
        user.isActive = false;
        return this.usersRepository.save(user);
    }

}