import { Inject, Injectable, Logger } from '@nestjs/common';
import { IQuestionRepository, IQuestionService } from '../interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionRepository, Question } from '../infra/database';
import { CreateQuestionDTO, QuestionDTO } from '../Dto';
import { IQuizService } from '@modules/quiz/interfaces';
import { I_QUIZ_SERVICE } from '@shared/utils/constants';

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

    return this.questionRepository.createAndSaveQuestion(data, quiz);
  }
  getQuestion(id: string): Promise<Question> {
    this.logger.log('getQuestion');
    return this.questionRepository.getQuestion(id);
  }
  async updateQuestion(data: QuestionDTO): Promise<boolean> {
    this.logger.log('updateQuestion');
    const quiz = await this.quizService.getQuizFromDatabase(data.quizId);
    return this.questionRepository.updateQuestion(data, quiz);
  }
  deleteQuestion(id: string): Promise<boolean> {
    this.logger.log('deleteQuestion');
    return this.questionRepository.deleteQuestion(id);
  }
}
