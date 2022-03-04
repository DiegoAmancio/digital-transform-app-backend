import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';
import { UserResolver } from './infra/graphql/user.resolver';
import { UserRepository } from './infra/database/user.repository';
import { UserService } from './services';
import { I_USER_SERVICE } from '@shared/utils/constants';

const userServiceProvider: Provider = {
  provide: I_USER_SERVICE,
  useClass: UserService,
};

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UserResolver, userServiceProvider],
  exports: [userServiceProvider],
})
export class UserModule {}
