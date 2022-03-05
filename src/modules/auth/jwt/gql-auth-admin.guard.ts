import {
  BadRequestException,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GqlAuthGuard } from './gql-auth.guard';

export class GqlAdmAuthGuard extends GqlAuthGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    if (req && req.user) {
      if (!req.user.isAdmin) {
        throw new UnauthorizedException();
      }
      return true;
    } else {
      throw new BadRequestException();
    }
  }
}
