import { Injectable, Logger } from '@nestjs/common';
import { IQuizRepository, IQuizService } from '../interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizRepository, Quiz } from '../infra/database';
import { CreateQuizDTO, QuizDTO } from '../Dto';

@Injectable()
export class QuizService implements IQuizService {
  private readonly logger = new Logger('Quiz service');
  constructor(
    @InjectRepository(QuizRepository)
    private readonly quizRepository: IQuizRepository,
  ) {}
  createQuiz(data: CreateQuizDTO): Promise<Quiz> {
    this.logger.log('getQuiz');
    return this.quizRepository.createAndSaveQuiz(data);
  }
  getQuiz(id: string): Promise<Quiz> {
    this.logger.log('getQuiz');
    return this.quizRepository.getQuiz(id);
  }
  updateQuiz(data: QuizDTO): Promise<boolean> {
    this.logger.log('updateQuiz');
    return this.quizRepository.updateQuiz(data);
  }
  deleteQuiz(id: string): Promise<boolean> {
    this.logger.log('deleteQuiz');
    return this.quizRepository.deleteQuiz(id);
  }
}
