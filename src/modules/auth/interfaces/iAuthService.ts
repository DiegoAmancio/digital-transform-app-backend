import { TokenDataInputDTO, TokenDataDTO } from '../Dto';

export interface IAuthService {
  generateToken(data: TokenDataInputDTO): Promise<TokenDataDTO>;
}
