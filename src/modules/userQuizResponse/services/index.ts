import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  IUserQuizResponseRepository,
  IUserQuizResponseService,
} from '../interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import {
  UserQuizResponse,
  UserQuizResponseRepository,
} from '../infra/database';
import {
  CreateUserQuizResponseDTO,
  UserQuizResponseDTO,
  UserQuizResponseUpdateDTO,
} from '../Dto';
import {
  USER_QUIZ_RESPONSE_UPDATED,
  USER_QUIZ_RESPONSE_NOT_FOUND,
  USER_QUIZ_RESPONSE_DELETED,
} from '@shared/utils/constants';
import { QuizRepository } from '@modules/quiz/infra/database';
import { IQuizRepository } from '@modules/quiz/interfaces';

@Injectable()
export class UserQuizResponseService implements IUserQuizResponseService {
  private readonly logger = new Logger('UserQuizResponse service');
  constructor(
    @InjectRepository(UserQuizResponseRepository)
    private readonly userQuizResponseRepository: IUserQuizResponseRepository,
    @InjectRepository(QuizRepository)
    private readonly quizRepository: IQuizRepository,
  ) {}
  async createUserQuizResponse(
    data: CreateUserQuizResponseDTO,
    userId: string,
  ): Promise<UserQuizResponseDTO> {
    this.logger.log('getUserQuizResponse');
    const quiz = await this.quizRepository.getQuiz(data.quiz);
    const UserQuizResponse =
      await this.userQuizResponseRepository.createAndSaveUserQuizResponse(
        data,
        quiz,
        userId,
      );

    return this.mapperUserQuizResponseEntityToDTO(UserQuizResponse);
  }
  async getUserQuizResponse(
    quizId: string,
    userId: string,
  ): Promise<UserQuizResponseDTO> {
    this.logger.log('getUserQuizResponse');
    const userQuizResponse =
      await this.userQuizResponseRepository.getUserQuizResponse(quizId, userId);

    if (!userQuizResponse) {
      const quiz = await this.quizRepository.getQuiz(quizId);

      const newUserQuizResponse =
        await this.userQuizResponseRepository.createAndSaveUserQuizResponse(
          {
            responses: [],
            lastQuestion: 0,
            quiz: quizId,
            complete: false,
          },
          quiz,
          userId,
        );
      console.log(newUserQuizResponse);

      return this.mapperUserQuizResponseEntityToDTO(newUserQuizResponse);
    }
    return this.mapperUserQuizResponseEntityToDTO(userQuizResponse);
  }
  async getUserQuizResponseFromDatabase(
    quizId: string,
    userId: string,
  ): Promise<UserQuizResponse> {
    this.logger.log('getUserQuizResponseFromDatabase');
    const UserQuizResponse =
      await this.userQuizResponseRepository.getUserQuizResponse(quizId, userId);
    if (!UserQuizResponse) {
      throw new NotFoundException(USER_QUIZ_RESPONSE_NOT_FOUND);
    }
    return UserQuizResponse;
  }
  async updateUserQuizResponse(
    data: UserQuizResponseUpdateDTO,
  ): Promise<string> {
    this.logger.log('updateUserQuizResponse');
    const response =
      await this.userQuizResponseRepository.updateUserQuizResponse(data);

    if (!response) {
      throw new NotFoundException(USER_QUIZ_RESPONSE_NOT_FOUND);
    }
    return USER_QUIZ_RESPONSE_UPDATED;
  }
  async deleteUserQuizResponse(id: string): Promise<string> {
    this.logger.log('deleteUserQuizResponse');
    const response =
      await this.userQuizResponseRepository.deleteUserQuizResponse(id);

    if (!response) {
      throw new NotFoundException(USER_QUIZ_RESPONSE_NOT_FOUND);
    }
    return USER_QUIZ_RESPONSE_UPDATED;
  }
  private mapperUserQuizResponseEntityToDTO(
    data: UserQuizResponse,
  ): UserQuizResponseDTO {
    const UserQuizResponse: UserQuizResponseDTO = {
      ...data,
      quiz: null,
    };
    return UserQuizResponse;
  }
}
