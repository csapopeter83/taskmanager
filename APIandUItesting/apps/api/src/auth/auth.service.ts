import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { LoginDto } from './dto/login.dto';

const DEMO_USERNAME = 'admin';
const DEMO_PASSWORD = 'password123';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(input: LoginDto): Promise<{ accessToken: string }> {
    if (input.username !== DEMO_USERNAME || input.password !== DEMO_PASSWORD) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const accessToken = await this.jwtService.signAsync({ sub: input.username });
    return { accessToken };
  }
}
