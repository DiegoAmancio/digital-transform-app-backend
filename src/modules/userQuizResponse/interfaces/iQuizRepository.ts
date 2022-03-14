import { CreateUserQuizResponseDTO, UserQuizResponseUpdateDTO } from '../Dto';
import { UserQuizResponse } from '../infra/database';

export interface IUserQuizResponseRepository {
  createAndSaveUserQuizResponse(
    data: CreateUserQuizResponseDTO,
  ): Promise<UserQuizResponse>;
  updateUserQuizResponse(data: UserQuizResponseUpdateDTO): Promise<boolean>;
  deleteUserQuizResponse(id: string): Promise<boolean>;
  getUserQuizResponse(id: string): Promise<UserQuizResponse>;
}
