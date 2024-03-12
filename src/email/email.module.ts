
import { Module } from '@nestjs/common';
import EmailService from './email.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            global: true,
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '300s' }
            }),
            inject: [ConfigService]
        })],
    controllers: [],
    providers: [EmailService],
    exports: [EmailService]
})
export class EmailModule { }