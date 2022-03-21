export class UserQuizResponseUpdateDTO {
  id: string;
  responses: number[];
  lastQuestion: number;
  complete: boolean;
  created_at: Date;
  updated_at: Date;
}
