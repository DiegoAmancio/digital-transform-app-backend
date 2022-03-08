export class CreateQuestionDTO {
  public alternatives: string[];
  public correctAnswers: number[];
  public enunciate: string;

  constructor(
    alternatives: string[],
    correctAnswers: number[],
    enunciate: string,
  ) {
    this.alternatives = alternatives;
    this.correctAnswers = correctAnswers;
    this.enunciate = enunciate;
  }
}
