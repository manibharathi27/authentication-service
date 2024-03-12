
import { Module } from '@nestjs/common';
import EmailService from './email-confirmation.service';
import { ConfigModule } from '@nestjs/config';
import EmailConfirmationService from './email-confirmation.service';
import { EmailConfirmationController } from './email-confirmation.controller';
import { UserModule } from 'src/user/user.module';
 
@Module({
  imports: [ConfigModule, UserModule],
  controllers: [EmailConfirmationController],
  providers: [EmailConfirmationService],
  exports: [EmailService]
})
export class EmailConfirmationModule {}