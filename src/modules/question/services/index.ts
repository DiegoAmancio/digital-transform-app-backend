import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IQuestionRepository, IQuestionService } from '../interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionRepository, Question } from '../infra/database';
import { CreateQuestionDTO, QuestionDTO } from '../Dto';
import { IQuizService } from '@modules/quiz/interfaces';
import {
  I_QUIZ_SERVICE,
  QUESTION_DELETED,
  QUESTION_NOT_FOUND,
  QUESTION_UPDATED,
  QUIZ_NOT_FOUND,
} from '@shared/utils/constants';

@Injectable()
export class QuestionService implements IQuestionService {
  private readonly logger = new Logger('Question service');
  constructor(
    @InjectRepository(QuestionRepository)
    private readonly questionRepository: IQuestionRepository,
    @Inject(I_QUIZ_SERVICE)
    private readonly quizService: IQuizService,
  ) {}
  async createQuestion(data: CreateQuestionDTO): Promise<Question> {
    this.logger.log('getQuestion');
    const quiz = await this.quizService.getQuizFromDatabase(data.quizId);
    if (!quiz) {
      throw new NotFoundException(QUIZ_NOT_FOUND);
    }
    return this.questionRepository.createAndSaveQuestion(data, quiz);
  }
  async getQuestion(id: string): Promise<Question> {
    this.logger.log('getQuestion');
    const question = await this.questionRepository.getQuestion(id);
    if (!question) {
      throw new NotFoundException(QUESTION_NOT_FOUND);
    }
    return question;
  }
  async updateQuestion(data: QuestionDTO): Promise<string> {
    this.logger.log('updateQuestion');
    const quiz = await this.quizService.getQuizFromDatabase(data.quizId);
    const response = this.questionRepository.updateQuestion(data, quiz);

    if (!response) {
      throw new NotFoundException(QUESTION_NOT_FOUND);
    }
    return QUESTION_UPDATED;
  }
  async deleteQuestion(id: string): Promise<string> {
    this.logger.log('deleteQuestion');
    const response = await this.questionRepository.deleteQuestion(id);

    if (!response) {
      throw new NotFoundException(QUESTION_NOT_FOUND);
    }
    return QUESTION_DELETED;
  }
}
