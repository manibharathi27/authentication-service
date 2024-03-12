import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(private userService: UserService, private jwtService: JwtService) { }

  async signIn(userName: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.findUserByName(userName);
    if (user ==null || !await bcrypt.compare(pass, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.userName };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

}