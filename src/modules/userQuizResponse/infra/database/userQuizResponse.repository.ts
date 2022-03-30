import { AbstractRepository, EntityRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { IUserQuizResponseRepository } from '@modules/userQuizResponse/interfaces';
import { UserQuizResponse } from './userQuizResponse.entity';
import {
  CreateUserQuizResponseDTO,
  UserQuizResponseUpdateDTO,
} from '@modules/userQuizResponse/Dto';
import { Logger } from '@nestjs/common';
import { Quiz } from '@modules/quiz/infra/database';

@EntityRepository(UserQuizResponse)
export class UserQuizResponseRepository
  extends AbstractRepository<UserQuizResponse>
  implements IUserQuizResponseRepository
{
  private readonly logger = new Logger('UserQuizResponse repository');

  async getUserQuizResponse(
    quizId: string,
    userId: string,
  ): Promise<UserQuizResponse> {
    this.logger.log(
      'getUserQuizResponse quizId: ' + quizId + ' userId: ' + userId,
    );

    const UserQuizResponse = await this.repository.findOne({
      where: {
        quizId: quizId,
        userId: userId,
      },
    });

    return UserQuizResponse;
  }
  async createAndSaveUserQuizResponse(
    data: CreateUserQuizResponseDTO,
    quiz: Quiz,
    userId: string,
  ): Promise<UserQuizResponse> {
    this.logger.log('createAndSaveUserQuizResponse: ' + JSON.stringify(data));
    const { complete, lastQuestion, responses } = data;

    const userQuizResponse = this.repository.create({
      id: uuidv4(),
      responses,
      complete,
      lastQuestion,
      quiz,
      userId: userId,
    });

    return this.repository.save(userQuizResponse);
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
