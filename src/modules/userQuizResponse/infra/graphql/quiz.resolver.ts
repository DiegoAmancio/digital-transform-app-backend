import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Logger, Inject, UseGuards } from '@nestjs/common';
import { QuizInputUpdateType, UserQuizResponseType } from './types';
import { GqlAuthGuard } from '@modules/auth/jwt/gql-auth.guard';
import { IUserQuizResponseService } from '../../interfaces';
import { I_QUIZ_SERVICE } from '@shared/utils/constants';

@Resolver(() => UserQuizResponseType)
export class QuizResolver {
  private readonly logger = new Logger('Quiz resolver');
  constructor(
    @Inject(I_QUIZ_SERVICE)
    private readonly quizService: IUserQuizResponseService,
  ) {}
  @Query(() => UserQuizResponseType)
  @UseGuards(GqlAuthGuard)
  async UserQuizResponse(
    @Args('quiz') id: string,
  ): Promise<UserQuizResponseType> {
    this.logger.log('quiz');

    return this.quizService.getUserQuizResponse(id);
  }
  @Mutation(() => UserQuizResponseType)
  @UseGuards(GqlAuthGuard)
  async createUserQuizResponse(
    @Args('input') data: UserQuizResponseType,
  ): Promise<UserQuizResponseType> {
    this.logger.log('Update quiz');

    return await this.quizService.createUserQuizResponse(data);
  }
  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async updateUserQuizResponse(
    @Args('input') data: QuizInputUpdateType,
  ): Promise<string> {
    this.logger.log('Update quiz');

    return await this.quizService.updateUserQuizResponse(data);
  }
  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async deleteUser(@Args('quiz') id: string): Promise<string> {
    this.logger.log('Delete user');

    return await this.quizService.deleteUserQuizResponse(id);
  }
}
