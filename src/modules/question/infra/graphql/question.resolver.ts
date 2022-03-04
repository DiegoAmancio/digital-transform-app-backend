import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Logger, Inject, UseGuards } from '@nestjs/common';
import { QuestionType } from './types';
import { GqlAuthGuard } from '@modules/auth/jwt/gql-auth.guard';
import { IQuestionService } from '../../interfaces';
import { I_USER_SERVICE } from '@shared/utils/constants';
import { QuestionDTO } from '@modules/question/Dto';

@Resolver(() => QuestionType)
export class UserResolver {
  private readonly logger = new Logger('User resolver');
  constructor(
    @Inject(I_USER_SERVICE)
    private readonly questionService: IQuestionService,
  ) {}
  @Query(() => QuestionType)
  @UseGuards(GqlAuthGuard)
  async question(@Args('question') id: string): Promise<QuestionType> {
    this.logger.log('question');

    return this.questionService.getQuestion(id);
  }
  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async updateQuestion(@Args('input') data: QuestionDTO): Promise<boolean> {
    this.logger.log('Update question');

    return await this.questionService.updateQuestion(data);
  }
  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteUser(@Args('question') id: string): Promise<boolean> {
    this.logger.log('Delete user');

    return await this.questionService.deleteQuestion(id);
  }
}
