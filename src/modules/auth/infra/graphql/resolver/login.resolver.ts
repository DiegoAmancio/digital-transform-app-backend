import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Logger, Inject } from '@nestjs/common';
import { TokenType, LoginInput } from '../types';
import { IAuthService } from '@modules/auth/interfaces';
import { I_AUTH_SERVICE } from '@shared/utils/constants';

@Resolver(() => TokenType)
export class AuthResolver {
  private readonly logger = new Logger('Login resolver');
  constructor(
    @Inject(I_AUTH_SERVICE)
    private readonly authService: IAuthService,
  ) {}
  @Mutation(() => TokenType)
  async loginUser(@Args('input') input: LoginInput): Promise<TokenType> {
    this.logger.log('user');
    return this.authService.generateToken(input);
  }
}
