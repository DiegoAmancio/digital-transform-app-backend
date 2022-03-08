import { Quiz } from '@modules/quiz/infra/database';
import { CreateQuestionDTO, QuestionDTO } from '../Dto';
import { Question } from '../infra/database';

export interface IQuestionRepository {
  createAndSaveQuestion(data: CreateQuestionDTO, quiz: Quiz): Promise<Question>;
  updateQuestion(data: QuestionDTO, quiz: Quiz): Promise<boolean>;
  deleteQuestion(id: string): Promise<boolean>;
  getQuestion(id: string): Promise<Question>;
}
