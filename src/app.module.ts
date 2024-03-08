import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.gaurd';
import { UserDto } from './user/dto/userDto';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UserModule, 
    AuthenticationModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'Manibh27@',
      database: 'userservicedb',
      entities: [UserDto]
    })],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ]
})
export class AppModule {}
