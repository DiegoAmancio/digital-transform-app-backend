export class UserQuizResponseUpdateDTO {
  id: string;
  responses: string[];
  lastQuestion: number;
  complete: boolean;
  created_at: Date;
  updated_at: Date;
}
