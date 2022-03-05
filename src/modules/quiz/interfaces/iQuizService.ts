import { CreateQuizDTO, QuizDTO } from '../Dto';
import { Quiz } from '../infra/database';

export interface IQuizService {
  createQuiz(data: CreateQuizDTO): Promise<Quiz>;
  getQuiz(id: string): Promise<Quiz>;
  updateQuiz(data: QuizDTO): Promise<boolean>;
  deleteQuiz(id: string): Promise<boolean>;
}
