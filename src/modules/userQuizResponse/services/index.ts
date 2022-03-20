import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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

@Injectable()
export class UserQuizResponseService implements IUserQuizResponseService {
  private readonly logger = new Logger('UserQuizResponse service');
  constructor(
    @InjectRepository(UserQuizResponseRepository)
    private readonly UserQuizResponseRepository: IUserQuizResponseRepository,
  ) {}
  async createUserQuizResponse(
    data: CreateUserQuizResponseDTO,
  ): Promise<UserQuizResponseDTO> {
    this.logger.log('getUserQuizResponse');
    const UserQuizResponse =
      await this.UserQuizResponseRepository.createAndSaveUserQuizResponse(data);

    return this.mapperUserQuizResponseEntityToDTO(UserQuizResponse);
  }
  async getUserQuizResponse(id: string): Promise<UserQuizResponseDTO> {
    this.logger.log('getUserQuizResponse');
    const UserQuizResponse =
      await this.UserQuizResponseRepository.getUserQuizResponse(id);
    if (!UserQuizResponse) {
      throw new NotFoundException(USER_QUIZ_RESPONSE_NOT_FOUND);
    }
    return this.mapperUserQuizResponseEntityToDTO(UserQuizResponse);
  }
  async getUserQuizResponseFromDatabase(id: string): Promise<UserQuizResponse> {
    this.logger.log('getUserQuizResponseFromDatabase');
    const UserQuizResponse =
      await this.UserQuizResponseRepository.getUserQuizResponse(id);
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
      await this.UserQuizResponseRepository.updateUserQuizResponse(data);

    if (!response) {
      throw new NotFoundException(USER_QUIZ_RESPONSE_NOT_FOUND);
    }
    return USER_QUIZ_RESPONSE_DELETED;
  }
  async deleteUserQuizResponse(id: string): Promise<string> {
    this.logger.log('deleteUserQuizResponse');
    const response =
      await this.UserQuizResponseRepository.deleteUserQuizResponse(id);

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
      quiz: data.quiz.id,
    };
    return UserQuizResponse;
  }
}
