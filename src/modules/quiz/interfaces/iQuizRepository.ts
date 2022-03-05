import { CreateQuizDTO, QuizDTO } from '../Dto';
import { Quiz } from '../infra/database';

export interface IQuizRepository {
  createAndSaveQuiz(data: CreateQuizDTO): Promise<Quiz>;
  updateQuiz(data: QuizDTO): Promise<boolean>;
  deleteQuiz(id: string): Promise<boolean>;
  getQuiz(id: string): Promise<Quiz>;
}
