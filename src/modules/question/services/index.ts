import { Injectable, Logger } from '@nestjs/common';
import { IQuestionRepository, IQuestionService } from '../interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionRepository, Question } from '../infra/database';
import { CreateQuestionDTO, QuestionDTO } from '../Dto';

@Injectable()
export class QuestionService implements IQuestionService {
  private readonly logger = new Logger('Question service');
  constructor(
    @InjectRepository(QuestionRepository)
    private readonly questionRepository: IQuestionRepository,
  ) {}
  createQuestion(data: CreateQuestionDTO): Promise<Question> {
    this.logger.log('getQuestion');
    return this.questionRepository.createAndSaveQuestion(data);
  }
  getQuestion(id: string): Promise<Question> {
    this.logger.log('getQuestion');
    return this.questionRepository.getQuestion(id);
  }
  updateQuestion(data: QuestionDTO): Promise<boolean> {
    this.logger.log('updateQuestion');
    return this.questionRepository.updateQuestion(data);
  }
  deleteQuestion(id: string): Promise<boolean> {
    this.logger.log('deleteQuestion');
    return this.questionRepository.deleteQuestion(id);
  }
}
