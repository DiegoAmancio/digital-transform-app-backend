import { CreateQuestionDTO, QuestionDTO } from '../Dto';
import { Question } from '../infra/database';

export interface IQuestionRepository {
  createAndSaveQuestion(data: CreateQuestionDTO): Promise<Question>;
  updateQuestion(data: QuestionDTO): Promise<boolean>;
  deleteQuestion(id: string): Promise<boolean>;
  getQuestion(id: string): Promise<Question>;
}
