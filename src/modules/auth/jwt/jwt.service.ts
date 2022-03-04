import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthJWTService {
  private readonly logger = new Logger('Auth service');

  constructor(private readonly jwtService: JwtService) {}

  async generateToken(payload: any): Promise<string> {
    this.logger.log(JSON.stringify(payload));

    return this.jwtService.sign(payload);
  }
}
