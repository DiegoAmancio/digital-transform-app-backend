import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';
import { QuestionResolver } from './infra/graphql/question.resolver';
import { QuestionRepository } from './infra/database';
import { QuestionService } from './services';
import { I_QUESTION_SERVICE } from '@shared/utils/constants';
import { QuizModule } from '@modules/quiz/quiz.module';

const QuestionServiceProvider: Provider = {
  provide: I_QUESTION_SERVICE,
  useClass: QuestionService,
};

@Module({
  imports: [QuizModule, TypeOrmModule.forFeature([QuestionRepository])],
  providers: [QuestionResolver, QuestionServiceProvider],
  exports: [QuestionServiceProvider],
})
export class QuestionModule {}
