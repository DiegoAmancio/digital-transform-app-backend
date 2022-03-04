import { AbstractRepository, EntityRepository } from 'typeorm';
import { IUserRepository } from '@modules/user/interfaces/iUserRepository';
import { User } from './user.entity';
import { UpdateUserDTO } from '@modules/user/Dto';
import { Logger } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository
  extends AbstractRepository<User>
  implements IUserRepository
{
  private readonly logger = new Logger('User repository');

  async getUser(id: string): Promise<User> {
    this.logger.log('getUser: ' + id);

    const user = await this.repository.findOne(id);

    return user;
  }
  createAndSaveUser(id: string, email: string, name: string): Promise<User> {
    this.logger.log('createAndSaveUser: ' + JSON.stringify({ email, name }));
    const user = this.repository.create({
      id: id,
      email: email,
      name: name,
    });

    return this.repository.save(user);
  }
  async updateUser(data: UpdateUserDTO): Promise<boolean> {
    this.logger.log('updateUser: ' + JSON.stringify(data));
    const result = await this.repository.update(data.id, data);

    return result.affected > 0;
  }
  async deleteUser(user: User): Promise<boolean> {
    this.logger.log('deleteUser ' + JSON.stringify(user));

    const result = await this.repository.delete(user.id);
    return result.affected > 0;
  }
}
