import {
  CreateUserQuizResponseDTO,
  UserQuizResponseDTO,
  UserQuizResponseUpdateDTO,
} from '../Dto';
import { UserQuizResponse } from '../infra/database';

export interface IUserQuizResponseService {
  createUserQuizResponse(
    data: CreateUserQuizResponseDTO,
    userId: string,
  ): Promise<UserQuizResponseDTO>;
  getUserQuizResponse(
    quizId: string,
    userId: string,
  ): Promise<UserQuizResponseDTO>;
  getUserQuizResponseFromDatabase(
    quizId: string,
    userId: string,
  ): Promise<UserQuizResponse>;
  updateUserQuizResponse(data: UserQuizResponseUpdateDTO): Promise<string>;
  deleteUserQuizResponse(id: string): Promise<string>;
}
