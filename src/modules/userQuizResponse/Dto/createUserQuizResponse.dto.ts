export class CreateUserQuizResponseDTO {
  responses: string[];
  lastQuestion: number;
  quiz: string;
  created_at: Date;
  updated_at: Date;
  complete: boolean;
}
