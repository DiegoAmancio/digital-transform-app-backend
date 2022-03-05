import { UserService } from '@modules/user/services';
import {
  HttpException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { I_AUTH_JWT_SERVICE, I_USER_SERVICE } from '@shared/utils/constants';
import { OAuth2Client } from 'google-auth-library';
import { TokenDataDTO, TokenDataInputDTO } from '../Dto';
import { IAuthService } from '../interfaces';
import { AuthJWTService } from '../jwt/jwt.service';

@Injectable()
export class AuthService implements IAuthService {
  private readonly logger = new Logger('Auth service');
  private readonly oAuth2Client = new OAuth2Client(
    `${process.env.OAUTH_GOOGLE_ID}`,
    `${process.env.OAUTH_GOOGLE_SECRET}`,
    `${process.env.OAUTH_GOOGLE_REDIRECT_URL}`,
  );

  constructor(
    @Inject(I_AUTH_JWT_SERVICE)
    private readonly authService: AuthJWTService,
    @Inject(I_USER_SERVICE)
    private readonly userService: UserService,
  ) {}

  async generateToken({
    reqEmail,
    reqGoogleId,
    reqTokenId,
  }: TokenDataInputDTO): Promise<TokenDataDTO> {
    this.logger.log('generateToken');

    this.logger.log('google verifyIdToken');
    const googleReq = await this.oAuth2Client.verifyIdToken({
      idToken: reqTokenId,
    });
    const { sub, email, name } = googleReq.getPayload();

    if (sub === reqGoogleId && email === reqEmail) {
      const { id, isAdmin } = await this.getUser(sub, email, name);
      const payload = {
        id: id,
        isAdmin: isAdmin,
        email: email,
        name: name,
      };
      return {
        token: await this.authService.generateToken(payload),
        isAdmin: isAdmin,
      };
    } else {
      throw new UnauthorizedException();
    }
  }

  /**
   * get user by id, if user doesn't exist create user and return info
   * @param sub user Id
   * @param email user email
   * @param name user name
   * @returns object with user id and if is admin
   */
  getUser = async (
    sub: string,
    email: string,
    name: string,
  ): Promise<{ id: string; isAdmin: boolean }> => {
    const { id, isAdmin } = await this.userService
      .getUser({ id: sub, isAdmin: false, email: email })
      .catch(async (error: HttpException) => {
        if (error.getStatus() === 404) {
          return this.userService.createUser({
            id: sub,
            email: email,
            name: name,
          });
        } else {
          throw error;
        }
      });
    return {
      id: id,
      isAdmin: isAdmin,
    };
  };
}
