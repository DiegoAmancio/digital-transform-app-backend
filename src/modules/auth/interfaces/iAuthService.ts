import { TokenDataInputDTO, TokenDataDTO } from '../Dto';

export interface IAuthService {
  generateToken(data: TokenDataInputDTO): Promise<TokenDataDTO>;
  getUser(
    sub: string,
    email: string,
    name: string,
  ): Promise<{ id: string; isAdmin: boolean }>;
}
