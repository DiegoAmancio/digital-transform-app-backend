import { CreateQuestionDTO } from '.';

export class QuestionDTO extends CreateQuestionDTO {
  public id: string;
  public created_at: Date;
  public updated_at: Date;
  constructor(
    id: string,
    enunciate: string,
    alternatives: string[],
    correctAnswers: number[],
    quizId?: string,
    created_at?: Date,
    updated_at?: Date,
  ) {
    super(alternatives, correctAnswers, enunciate, quizId);
    this.id = id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
