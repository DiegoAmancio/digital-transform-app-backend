import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';
import { UserResolver } from './infra/graphql/question.resolver';
import { QuestionRepository } from './infra/database';
import { QuestionService } from './services';
import { I_USER_SERVICE } from '@shared/utils/constants';

const QuestionServiceProvider: Provider = {
  provide: I_USER_SERVICE,
  useClass: QuestionService,
};

@Module({
  imports: [TypeOrmModule.forFeature([QuestionRepository])],
  providers: [UserResolver, QuestionServiceProvider],
  exports: [QuestionServiceProvider],
})
export class UserModule {}
