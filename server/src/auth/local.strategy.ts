import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService, UserJwtPayload } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'password', // local strategy would not accept an empty username field, and since we have just one user we'll set the usernameField to be the same as the password
    });
  }

  async validate(username: string, password: string): Promise<UserJwtPayload> {
    const authenticationResult = await this.authService.validatePassword(
      password,
    );
    if (!authenticationResult) {
      throw new UnauthorizedException();
    }
    return {};
  }
}
