export class CreateQuestionDTO {
  public alternatives: string[];
  public correctAnswers: number[];
  public enunciate: string;
  public quizId: string;

  constructor(
    alternatives: string[],
    correctAnswers: number[],
    enunciate: string,
    quizId: string,
  ) {
    this.alternatives = alternatives;
    this.correctAnswers = correctAnswers;
    this.enunciate = enunciate;
    this.quizId = quizId;
  }
}
