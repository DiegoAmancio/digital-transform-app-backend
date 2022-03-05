import { AbstractRepository, EntityRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { IQuizRepository } from '@modules/quiz/interfaces';
import { Quiz } from './quiz.entity';
import { CreateQuizDTO, QuizDTO } from '@modules/Quiz/Dto';
import { Logger } from '@nestjs/common';

@EntityRepository(Quiz)
export class QuizRepository
  extends AbstractRepository<Quiz>
  implements IQuizRepository
{
  private readonly logger = new Logger('Quiz repository');

  async getQuiz(id: string): Promise<Quiz> {
    this.logger.log('getQuiz: ' + id);

    const quiz = await this.repository.findOne(id);

    return quiz;
  }
  createAndSaveQuiz(data: CreateQuizDTO): Promise<Quiz> {
    this.logger.log('createAndSaveQuiz: ' + JSON.stringify(data));
    const quiz = this.repository.create({ id: uuidv4(), ...data });

    return this.repository.save(quiz);
  }
  async updateQuiz(data: QuizDTO): Promise<boolean> {
    this.logger.log('updateQuiz: ' + JSON.stringify(data));
    const result = await this.repository.update(data.id, data);

    return result.affected > 0;
  }
  async deleteQuiz(id: string): Promise<boolean> {
    this.logger.log('deleteQuiz: ' + id);

    const result = await this.repository.delete(id);
    return result.affected > 0;
  }
}
