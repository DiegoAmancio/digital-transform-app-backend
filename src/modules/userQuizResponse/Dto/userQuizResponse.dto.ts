import { CreateUserQuizResponseDTO } from '.';

export class UserQuizResponseDTO extends CreateUserQuizResponseDTO {
  id: string;
  complete: boolean;
}
