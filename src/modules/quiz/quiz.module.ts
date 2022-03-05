import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';
import { QuizResolver } from './infra/graphql/quiz.resolver';
import { QuizRepository } from './infra/database';
import { QuizService } from './services';
import { I_USER_SERVICE } from '@shared/utils/constants';

const QuizServiceProvider: Provider = {
  provide: I_USER_SERVICE,
  useClass: QuizService,
};

@Module({
  imports: [TypeOrmModule.forFeature([QuizRepository])],
  providers: [QuizResolver, QuizServiceProvider],
  exports: [QuizServiceProvider],
})
export class QuizModule {}
