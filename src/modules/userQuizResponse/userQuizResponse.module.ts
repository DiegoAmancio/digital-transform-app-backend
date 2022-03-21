import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';
import { UserResponseQuizResolver } from './infra/graphql/userQuizResponse.resolver';
import { UserQuizResponseRepository } from './infra/database';
import { UserQuizResponseService } from './services';
import { I_USER_QUIZ_SERVICE } from '@shared/utils/constants';
import { QuizModule } from '@modules/quiz/quiz.module';

const UserQuizResponseServiceProvider: Provider = {
  provide: I_USER_QUIZ_SERVICE,
  useClass: UserQuizResponseService,
};

@Module({
  imports: [QuizModule, TypeOrmModule.forFeature([UserQuizResponseRepository])],
  providers: [UserResponseQuizResolver, UserQuizResponseServiceProvider],
  exports: [UserQuizResponseServiceProvider],
})
export class UserQuizResponseModule {}
