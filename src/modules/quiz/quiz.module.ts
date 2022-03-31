import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';
import { QuizResolver } from './infra/graphql/quiz.resolver';
import { QuizRepository } from './infra/database';
import { QuizService } from './services';
import { I_QUIZ_SERVICE } from '@shared/utils/constants';
import { UserQuizResponseModule } from '@modules/userQuizResponse/userQuizResponse.module';

const QuizServiceProvider: Provider = {
  provide: I_QUIZ_SERVICE,
  useClass: QuizService,
};

@Module({
  imports: [TypeOrmModule.forFeature([QuizRepository]), UserQuizResponseModule],
  providers: [QuizResolver, QuizServiceProvider],
  exports: [QuizServiceProvider],
})
export class QuizModule {}
