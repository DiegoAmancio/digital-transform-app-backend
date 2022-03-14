import { UserQuizResponseDTO, UserQuizResponseUpdateDTO } from '../Dto';
import { UserQuizResponse } from '../infra/database';

export interface IUserQuizResponseService {
  createUserQuizResponse(
    data: UserQuizResponseDTO,
  ): Promise<UserQuizResponseDTO>;
  getUserQuizResponse(id: string): Promise<UserQuizResponseDTO>;
  getUserQuizResponseFromDatabase(id: string): Promise<UserQuizResponse>;
  updateUserQuizResponse(data: UserQuizResponseUpdateDTO): Promise<string>;
  deleteUserQuizResponse(id: string): Promise<string>;
}
