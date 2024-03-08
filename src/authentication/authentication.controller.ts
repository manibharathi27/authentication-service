import { Controller, Get, Post, Body, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UserDto } from 'src/user/dto/userDto';
import { AuthGuard } from '../auth.gaurd';
import { Public } from '../public.decorator';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({
    type: UserDto,
    description: 'Json structure for user object'
 })
  signIn(@Body() user: UserDto) {
    return this.authenticationService.signIn(user.userName, user.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}