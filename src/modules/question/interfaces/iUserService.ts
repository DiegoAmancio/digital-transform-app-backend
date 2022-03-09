import { CreateQuestionDTO, QuestionDTO } from '../Dto';
import { Question } from '../infra/database';

export interface IQuestionService {
  createQuestion(data: CreateQuestionDTO): Promise<Question>;
  getQuestion(id: string): Promise<Question>;
  updateQuestion(data: QuestionDTO): Promise<string>;
  deleteQuestion(id: string): Promise<string>;
}
