import { BadRequestException, Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
 
@Injectable()
export default class EmailService {
  private nodemailerTransport: Mail;
 
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService
    
  ) {
    this.nodemailerTransport = createTransport({
      service: configService.get('EMAIL_SERVICE'),
      auth: {
        user: configService.get('EMAIL_USER'),
        pass: configService.get('EMAIL_PASSWORD'),
      }
    });
  }

  public async sendVerificationLink(email: string) {
    const token = await this.jwtService.signAsync({emailId: email});
 
    const url = `${this.configService.get('EMAIL_CONFIRMATION_URL')}?token=${token}`;
 
    const text = `Welcome to the application. To confirm the email address, click here: ${url}`;
 
    return this.sendMail({
      to: email,
      subject: 'Email confirmation',
      text,
    })
  }
 
  sendMail(options: Mail.Options) {
    return this.nodemailerTransport.sendMail(options);
  }
}