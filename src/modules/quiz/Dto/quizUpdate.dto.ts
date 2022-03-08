import { CreateQuizDTO } from '.';

export class QuizUpdateDTO extends CreateQuizDTO {
  id: string;
  name: string;
}
