import { Quiz } from '@modules/quiz/infra/database';
import { CreateUserQuizResponseDTO, UserQuizResponseUpdateDTO } from '../Dto';
import { UserQuizResponse } from '../infra/database';

export interface IUserQuizResponseRepository {
  createAndSaveUserQuizResponse(
    data: CreateUserQuizResponseDTO,
    quiz: Quiz,
    userId: string,
  ): Promise<UserQuizResponse>;
  updateUserQuizResponse(data: UserQuizResponseUpdateDTO): Promise<boolean>;
  deleteUserQuizResponse(id: string): Promise<boolean>;
  getUserQuizResponse(
    quizId: string,
    userId: string,
  ): Promise<UserQuizResponse>;
}
