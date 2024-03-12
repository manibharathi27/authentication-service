import { BadRequestException, Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export default class EmailConfirmationService {

  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private userService: UserService

  ) {
  }
  public async confirmEmail(token: string) {
    const email = await this.decodeConfirmationToken(token);
    const user = await this.userService.findUserByEmailId(email);
    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.userService.markEmailAsConfirmed(user);
  }

  public async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.configService.get<string>('JWT_SECRET')
        }
      );
      if (typeof payload === 'object' && 'emailId' in payload) {
        return payload.emailId;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }
}