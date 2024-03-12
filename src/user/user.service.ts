import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserDto } from './dto/userDto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import EmailService from 'src/email/email.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserDto)
        private usersRepository: Repository<UserDto>,
        private emailService: EmailService
    ) { }
    async create(user: UserDto): Promise<UserDto | null> {
        if (user == null) {
            throw new InternalServerErrorException("Invalid User Data");
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;

        return this.usersRepository.save(user).then(user => this.emailService.sendVerificationLink(user.emailId));
    }

    findUserByName(userName: string): Promise<UserDto | null> {
        return this.usersRepository.findOneBy({ userName });
    }

    findUserByEmailId(emailId: string): Promise<UserDto | null> {
        return this.usersRepository.findOneBy({ emailId });
    }

    findUsers(): Promise<UserDto[]> {
        return this.usersRepository.find();
    }

    findUserById(id: number): Promise<UserDto | null> {
        return this.usersRepository.findOneBy({ id });
    }

    markEmailAsConfirmed(user: UserDto) {
        user.isEmailConfirmed = true;
        return this.usersRepository.save(user);
    }

    async deleteUser(id: number) {
        const user = await this.findUserById(id);
        user.isActive = false;
        return this.usersRepository.save(user);
    }

}