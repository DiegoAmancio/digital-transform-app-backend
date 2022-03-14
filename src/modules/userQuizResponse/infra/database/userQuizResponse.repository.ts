import { AbstractRepository, EntityRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { IUserQuizResponseRepository } from '@modules/UserQuizResponse/interfaces';
import { UserQuizResponse } from './userQuizResponse.entity';
import {
  CreateUserQuizResponseDTO,
  UserQuizResponseUpdateDTO,
} from '@modules/UserQuizResponse/Dto';
import { Inject, Logger } from '@nestjs/common';
import { I_QUIZ_SERVICE } from '@shared/utils/constants';
import { IQuizService } from '@modules/quiz/interfaces';

@EntityRepository(UserQuizResponse)
export class UserQuizResponseRepository
  extends AbstractRepository<UserQuizResponse>
  implements IUserQuizResponseRepository
{
  private readonly logger = new Logger('UserQuizResponse repository');
  constructor(
    @Inject(I_QUIZ_SERVICE)
    private readonly quizService: IQuizService,
  ) {
    super();
  }
  async getUserQuizResponse(id: string): Promise<UserQuizResponse> {
    this.logger.log('getUserQuizResponse: ' + id);

    const UserQuizResponse = await this.repository.findOne(id);

    return UserQuizResponse;
  }
  async createAndSaveUserQuizResponse(
    data: CreateUserQuizResponseDTO,
  ): Promise<UserQuizResponse> {
    this.logger.log('createAndSaveUserQuizResponse: ' + JSON.stringify(data));
    const { complete, lastQuestion, quiz, responses } = data;
    const quizFk = await this.quizService.getQuizFromDatabase(quiz);
    const UserQuizResponse = this.repository.create({
      id: uuidv4(),
      responses: responses,
      complete,
      lastQuestion,
      quiz: quizFk,
    });
    const UserQuizResponse_saved = await this.repository.save(UserQuizResponse);

    return UserQuizResponse_saved;
  }
  async updateUserQuizResponse(
    data: UserQuizResponseUpdateDTO,
  ): Promise<boolean> {
    this.logger.log('updateUserQuizResponse: ' + JSON.stringify(data));
    const result = await this.repository.update(data.id, data);

    return result.affected > 0;
  }
  async deleteUserQuizResponse(id: string): Promise<boolean> {
    this.logger.log('deleteUserQuizResponse: ' + id);

    const result = await this.repository.delete(id);
    return result.affected > 0;
  }
}
