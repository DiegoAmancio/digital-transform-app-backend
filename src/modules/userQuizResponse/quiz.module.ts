import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';
import { QuizResolver } from './infra/graphql/quiz.resolver';
import { UserQuizResponseRepository } from './infra/database';
import { UserQuizResponseService } from './services';
import { I_QUIZ_SERVICE } from '@shared/utils/constants';

const UserQuizResponseServiceProvider: Provider = {
  provide: I_QUIZ_SERVICE,
  useClass: UserQuizResponseService,
};

@Module({
  imports: [TypeOrmModule.forFeature([UserQuizResponseRepository])],
  providers: [QuizResolver, UserQuizResponseServiceProvider],
  exports: [UserQuizResponseServiceProvider],
})
export class QuizModule {}
