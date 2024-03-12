import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.gaurd';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './TypeOrmConfigService ';
import { EmailModule } from './email/email.module';
import { EmailConfirmationModule } from './email-confirmation/email-confiration.module';

@Module({
  imports: [
    UserModule,
    EmailModule,
    EmailConfirmationModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthenticationModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    })
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ]
})
export class AppModule { }
