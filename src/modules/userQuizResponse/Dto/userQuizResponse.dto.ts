import { CreateUserQuizResponseDTO } from '.';

export class UserQuizResponseDTO extends CreateUserQuizResponseDTO {
  id: string;
  complete: boolean;
  created_at: Date;
  updated_at: Date;
}
