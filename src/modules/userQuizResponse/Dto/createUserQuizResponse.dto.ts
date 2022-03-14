export class CreateUserQuizResponseDTO {
  responses: number[];
  lastQuestion: number;
  complete: boolean;
  quiz: string;
  created_at: Date;
  updated_at: Date;
}
