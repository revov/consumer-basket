import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { ENV } from 'src/environment';

export type UserJwtPayload = Record<string, never>;

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validatePassword(password: string): Promise<Record<string, never>> {
    const authenticated = await compare(password, ENV.LOGIN_CREDENTIALS_HASH);

    return authenticated ? {} : null;
  }

  async signJwt() {
    const jwtPayload: UserJwtPayload = {};

    return {
      accessToken: this.jwtService.sign(jwtPayload),
    };
  }
}
