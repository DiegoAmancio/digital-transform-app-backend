import { Quiz } from '@modules/quiz/infra/database';
import { CreateUserQuizResponseDTO, UserQuizResponseUpdateDTO } from '../Dto';
import { UserQuizResponse } from '../infra/database';

export interface IUserQuizResponseRepository {
  createAndSaveUserQuizResponse(
    data: CreateUserQuizResponseDTO,
    quiz: Quiz,
  ): Promise<UserQuizResponse>;
  updateUserQuizResponse(data: UserQuizResponseUpdateDTO): Promise<boolean>;
  deleteUserQuizResponse(id: string): Promise<boolean>;
  getUserQuizResponse(id: string): Promise<UserQuizResponse>;
}
