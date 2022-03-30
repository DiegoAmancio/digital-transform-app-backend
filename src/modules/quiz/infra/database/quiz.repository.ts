import { AbstractRepository, EntityRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { IQuizRepository } from '@modules/quiz/interfaces';
import { Quiz } from './quiz.entity';
import { CreateQuizDTO, QuizUpdateDTO } from '@modules/quiz/Dto';
import { Logger } from '@nestjs/common';

@EntityRepository(Quiz)
export class QuizRepository
  extends AbstractRepository<Quiz>
  implements IQuizRepository
{
  private readonly logger = new Logger('Quiz repository');

  async getAllQuiz(): Promise<Quiz[]> {
    this.logger.log('getAllQuiz');

    const quiz = await this.repository.find({
      relations: ['questions'],
    });

    return quiz;
  }
  async getQuiz(id: string): Promise<Quiz> {
    this.logger.log('getQuiz: ' + id);

    const quiz = await this.repository.findOne(id, {
      relations: ['questions'],
    });

    return quiz;
  }
  async createAndSaveQuiz(data: CreateQuizDTO): Promise<Quiz> {
    this.logger.log('createAndSaveQuiz: ' + JSON.stringify(data));
    const quiz = this.repository.create({ id: uuidv4(), ...data });
    const quiz_saved = await this.repository.save(quiz);

    return quiz_saved;
  }
  async updateQuiz(data: QuizUpdateDTO): Promise<boolean> {
    this.logger.log('updateQuiz: ' + JSON.stringify(data));
    const { id, name } = data;
    const result = await this.repository.update(data.id, {
      id,
      name,
    });

    return result.affected > 0;
  }
  async deleteQuiz(id: string): Promise<boolean> {
    this.logger.log('deleteQuiz: ' + id);

    const result = await this.repository.delete(id);
    return result.affected > 0;
  }
}
