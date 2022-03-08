import { QuestionDTO } from '@modules/question/Dto';
import { CreateQuizDTO } from '.';

export class QuizDTO extends CreateQuizDTO {
  id: string;
  questions: QuestionDTO[];
  created_at: Date;
  updated_at: Date;
}
