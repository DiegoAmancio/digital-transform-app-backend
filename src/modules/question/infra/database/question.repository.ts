import { AbstractRepository, EntityRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { IQuestionRepository } from '@modules/question/interfaces';
import { Question } from './question.entity';
import { CreateQuestionDTO, QuestionDTO } from '@modules/question/Dto';
import { Logger } from '@nestjs/common';

@EntityRepository(Question)
export class QuestionRepository
  extends AbstractRepository<Question>
  implements IQuestionRepository
{
  private readonly logger = new Logger('Question repository');

  async getQuestion(id: string): Promise<Question> {
    this.logger.log('getQuestion: ' + id);

    const question = await this.repository.findOne(id);

    return question;
  }
  createAndSaveQuestion(data: CreateQuestionDTO): Promise<Question> {
    this.logger.log('createAndSaveQuestion: ' + JSON.stringify(data));
    const question = this.repository.create({ id: uuidv4(), ...data });

    return this.repository.save(question);
  }
  async updateQuestion(data: QuestionDTO): Promise<boolean> {
    this.logger.log('updateQuestion: ' + JSON.stringify(data));
    const result = await this.repository.update(data.id, data);

    return result.affected > 0;
  }
  async deleteQuestion(id: string): Promise<boolean> {
    this.logger.log('deleteQuestion: ' + id);

    const result = await this.repository.delete(id);
    return result.affected > 0;
  }
}
