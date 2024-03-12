import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Public } from 'src/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import EmailConfirmationService from './email-confirmation.service';

@ApiTags('Email')
@Controller('email')
export class EmailConfirmationController {
    constructor(private emailConfirmationService: EmailConfirmationService) { }

    @Public()
    @Get('confirm')
    async confirm(@Query('token') token: string) {
        await this.emailConfirmationService.confirmEmail(token);
    }
}