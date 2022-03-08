import { CreateQuestionDTO } from '.';

export class QuestionUpdateDTO extends CreateQuestionDTO {
  public id: string;
  public quiz: string;
}
