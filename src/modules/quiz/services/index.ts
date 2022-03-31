import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IQuizRepository, IQuizService } from '../interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz, QuizRepository } from '../infra/database';
import { CreateQuizDTO, QuizDTO, QuizUpdateDTO } from '../Dto';
import { QuestionDTO } from '@modules/question/Dto';
import {
  QUIZ_UPDATED,
  QUIZ_NOT_FOUND,
  QUIZ_DELETED,
  I_USER_QUIZ_SERVICE,
} from '@shared/utils/constants';
import { IUserQuizResponseService } from '@modules/userQuizResponse/interfaces';

@Injectable()
export class QuizService implements IQuizService {
  private readonly logger = new Logger('Quiz service');
  constructor(
    @InjectRepository(QuizRepository)
    private readonly quizRepository: IQuizRepository,
    @Inject(I_USER_QUIZ_SERVICE)
    private readonly quizService: IUserQuizResponseService,
  ) {}
  async getAllQuiz(userId: string): Promise<QuizDTO[]> {
    this.logger.log('getAllQuiz');
    const quizes = await this.quizRepository.getAllQuiz();

    const quizesMapped = quizes.map((quiz) => this.mapperQuizEntityToDTO(quiz));

    const completes = await Promise.all(
      quizesMapped.map((quiz) =>
        this.quizService.getUserQuizResponse(quiz.id, userId),
      ),
    );
    console.log(completes);

    return quizes.map((quiz, index) => ({
      ...quiz,
      complete: completes[index].complete,
    }));
  }
  async createQuiz(data: CreateQuizDTO): Promise<QuizDTO> {
    this.logger.log('getQuiz');
    const quiz = await this.quizRepository.createAndSaveQuiz(data);

    return this.mapperQuizEntityToDTO(quiz);
  }
  async getQuiz(id: string): Promise<QuizDTO> {
    this.logger.log('getQuiz');
    const quiz = await this.quizRepository.getQuiz(id);
    if (!quiz) {
      throw new NotFoundException(QUIZ_NOT_FOUND);
    }
    return this.mapperQuizEntityToDTO(quiz);
  }
  async getQuizFromDatabase(id: string): Promise<Quiz> {
    this.logger.log('getQuizFromDatabase');
    const quiz = await this.quizRepository.getQuiz(id);
    if (!quiz) {
      throw new NotFoundException(QUIZ_NOT_FOUND);
    }
    return quiz;
  }
  async updateQuiz(data: QuizUpdateDTO): Promise<string> {
    this.logger.log('updateQuiz');
    const response = await this.quizRepository.updateQuiz(data);

    if (!response) {
      throw new NotFoundException(QUIZ_NOT_FOUND);
    }
    return QUIZ_UPDATED;
  }
  async deleteQuiz(id: string): Promise<string> {
    this.logger.log('deleteQuiz');
    const response = await this.quizRepository.deleteQuiz(id);

    if (!response) {
      throw new NotFoundException(QUIZ_NOT_FOUND);
    }
    return QUIZ_DELETED;
  }
  private mapperQuizEntityToDTO({
    id,
    name,
    questions,
    created_at,
    updated_at,
  }: Quiz): QuizDTO {
    const questionsMapped =
      questions && questions.length > 0
        ? questions.map((question) => {
            return new QuestionDTO(
              question.id,
              question.enunciate,
              question.alternatives,
              question.correctAnswers,
              null,
              question.created_at,
              question.updated_at,
            );
          })
        : [];
    const quiz: QuizDTO = {
      id,
      name,
      questions: questionsMapped,
      created_at,
      updated_at,
      complete: null,
    };
    return quiz;
  }
}
