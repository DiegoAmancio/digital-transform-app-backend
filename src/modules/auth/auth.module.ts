import { UserModule } from '@modules/user/user.module';
import { Module, Provider } from '@nestjs/common';
import { I_AUTH_JWT_SERVICE, I_AUTH_SERVICE } from '@shared/utils/constants';
import { AuthResolver } from './infra/graphql/resolver/login.resolver';
import { JWTModule } from './jwt/jwt.module';
import { AuthJWTService } from './jwt/jwt.service';
import { AuthService } from './services';

const authServiceProvider: Provider = {
  provide: I_AUTH_SERVICE,
  useClass: AuthService,
};
const authJWTServiceProvider: Provider = {
  provide: I_AUTH_JWT_SERVICE,
  useClass: AuthJWTService,
};
@Module({
  imports: [JWTModule, UserModule],
  providers: [AuthResolver, authServiceProvider, authJWTServiceProvider],
  exports: [authServiceProvider, authJWTServiceProvider],
})
export class AuthModule {}
