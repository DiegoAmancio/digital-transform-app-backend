import { Injectable, Logger } from '@nestjs/common';
import { IQuizRepository, IQuizService } from '../interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz, QuizRepository } from '../infra/database';
import { CreateQuizDTO, QuizDTO, QuizUpdateDTO } from '../Dto';
import { QuestionDTO } from '@modules/question/Dto';

@Injectable()
export class QuizService implements IQuizService {
  private readonly logger = new Logger('Quiz service');
  constructor(
    @InjectRepository(QuizRepository)
    private readonly quizRepository: IQuizRepository,
  ) {}
  async createQuiz(data: CreateQuizDTO): Promise<QuizDTO> {
    this.logger.log('getQuiz');
    const quiz = await this.quizRepository.createAndSaveQuiz(data);

    return this.mapperQuizEntityToDTO(quiz);
  }
  async getQuiz(id: string): Promise<QuizDTO> {
    this.logger.log('getQuiz');
    const quiz = await this.quizRepository.getQuiz(id);

    return this.mapperQuizEntityToDTO(quiz);
  }
  async getQuizFromDatabase(id: string): Promise<Quiz> {
    this.logger.log('getQuizFromDatabase');
    const quiz = await this.quizRepository.getQuiz(id);

    return quiz;
  }
  updateQuiz(data: QuizUpdateDTO): Promise<boolean> {
    this.logger.log('updateQuiz');
    return this.quizRepository.updateQuiz(data);
  }
  deleteQuiz(id: string): Promise<boolean> {
    this.logger.log('deleteQuiz');
    return this.quizRepository.deleteQuiz(id);
  }
  private mapperQuizEntityToDTO({
    id,
    name,
    questions,
    created_at,
    updated_at,
  }: Quiz): QuizDTO {
    const questionsMapped = questions
      ? questions.map((question) => {
          return new QuestionDTO(
            question.id,
            question.enunciate,
            question.alternatives,
            question.correctAnswers,
            question.quiz.id,
            question.created_at,
            question.updated_at,
          );
        })
      : null;
    const quiz: QuizDTO = {
      id,
      name,
      questions: questionsMapped,
      created_at,
      updated_at,
    };
    return quiz;
  }
}
