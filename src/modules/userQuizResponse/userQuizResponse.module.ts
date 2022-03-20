import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';
import { QuizResolver } from './infra/graphql/userQuizResponse.resolver';
import { UserQuizResponseRepository } from './infra/database';
import { UserQuizResponseService } from './services';
import { I_USER_QUIZ_SERVICE } from '@shared/utils/constants';

const UserQuizResponseServiceProvider: Provider = {
  provide: I_USER_QUIZ_SERVICE,
  useClass: UserQuizResponseService,
};

@Module({
  imports: [TypeOrmModule.forFeature([UserQuizResponseRepository])],
  providers: [QuizResolver, UserQuizResponseServiceProvider],
  exports: [UserQuizResponseServiceProvider],
})
export class UserQuizResponseModule {}
