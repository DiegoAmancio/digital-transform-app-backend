import { CreateQuestionDTO } from '.';

export class QuestionDTO extends CreateQuestionDTO {
  public id: string;
  public quiz: string;
  public created_at: Date;
  public updated_at: Date;
  constructor(
    id: string,
    enunciate: string,
    alternatives: string[],
    correctAnswers: number[],
    created_at?: Date,
    updated_at?: Date,
    quiz?: string,
  ) {
    super(alternatives, correctAnswers, enunciate);
    this.id = id;
    this.quiz = quiz;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
