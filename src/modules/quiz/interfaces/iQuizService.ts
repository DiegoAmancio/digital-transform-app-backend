import { CreateQuizDTO, QuizDTO, QuizUpdateDTO } from '../Dto';
import { Quiz } from '../infra/database';

export interface IQuizService {
  createQuiz(data: CreateQuizDTO): Promise<QuizDTO>;
  getQuiz(id: string): Promise<QuizDTO>;
  getQuizFromDatabase(id: string): Promise<Quiz>;
  updateQuiz(data: QuizUpdateDTO): Promise<boolean>;
  deleteQuiz(id: string): Promise<boolean>;
}
