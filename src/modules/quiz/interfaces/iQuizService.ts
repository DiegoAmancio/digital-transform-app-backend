import { CreateQuizDTO, QuizDTO, QuizUpdateDTO } from '../Dto';

export interface IQuizService {
  createQuiz(data: CreateQuizDTO): Promise<QuizDTO>;
  getQuiz(id: string): Promise<QuizDTO>;
  updateQuiz(data: QuizUpdateDTO): Promise<boolean>;
  deleteQuiz(id: string): Promise<boolean>;
}
