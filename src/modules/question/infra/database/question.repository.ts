import { AbstractRepository, EntityRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { IQuestionRepository } from '@modules/question/interfaces';
import { Question } from './question.entity';
import { CreateQuestionDTO, QuestionDTO } from '@modules/question/Dto';
import { Logger } from '@nestjs/common';
import { IQuizRepository } from '@modules/quiz/interfaces';
import { QuizRepository } from '@modules/quiz/infra/database';
import { InjectRepository } from '@nestjs/typeorm';

@EntityRepository(Question)
export class QuestionRepository
  extends AbstractRepository<Question>
  implements IQuestionRepository
{
  private readonly logger = new Logger('Question repository');
  constructor(
    @InjectRepository(QuizRepository)
    private readonly quizService: IQuizRepository,
  ) {
    super();
  }
  async getQuestion(id: string): Promise<Question> {
    this.logger.log('getQuestion: ' + id);

    const question = await this.repository.find({
      relations: ['quiz'],
    });

    return question[0];
  }
  createAndSaveQuestion(data: CreateQuestionDTO): Promise<Question> {
    this.logger.log('createAndSaveQuestion: ' + JSON.stringify(data));
    const question = this.repository.create({ id: uuidv4(), ...data });

    return this.repository.save(question);
  }
  async updateQuestion(data: QuestionDTO): Promise<boolean> {
    this.logger.log('updateQuestion: ' + JSON.stringify(data));

    const { id, alternatives, correctAnswers, enunciate, quiz } = data;

    const quiz_id = await this.quizService.getQuiz(quiz);

    const result = await this.repository.update(id, {
      id,
      alternatives,
      correctAnswers,
      enunciate,
      quiz: quiz_id,
    });

    return result.affected > 0;
  }
  async deleteQuestion(id: string): Promise<boolean> {
    this.logger.log('deleteQuestion: ' + id);

    const result = await this.repository.delete(id);
    return result.affected > 0;
  }
}
