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
  I_QUIZ_SERVICE,
} from '@shared/utils/constants';
import { IQuizService } from '@modules/quiz/interfaces';

@Injectable()
export class UserQuizResponseService implements IUserQuizResponseService {
  private readonly logger = new Logger('UserQuizResponse service');
  constructor(
    @InjectRepository(UserQuizResponseRepository)
    private readonly userQuizResponseRepository: IUserQuizResponseRepository,
    @Inject(I_QUIZ_SERVICE)
    private readonly quizService: IQuizService,
  ) {}
  async createUserQuizResponse(
    data: CreateUserQuizResponseDTO,
    userId: string,
  ): Promise<UserQuizResponseDTO> {
    this.logger.log('getUserQuizResponse');
    const quiz = await this.quizService.getQuizFromDatabase(data.quiz);
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
    const UserQuizResponse =
      await this.userQuizResponseRepository.getUserQuizResponse(quizId, userId);
    if (!UserQuizResponse) {
      throw new NotFoundException(USER_QUIZ_RESPONSE_NOT_FOUND);
    }
    return this.mapperUserQuizResponseEntityToDTO(UserQuizResponse);
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
    return USER_QUIZ_RESPONSE_DELETED;
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
