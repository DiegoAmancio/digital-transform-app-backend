import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Logger, Inject, UseGuards } from '@nestjs/common';
import {
  UserQuizResponseInputType,
  QuizInputUpdateType,
  UserQuizResponseType,
} from './types';
import { GqlAuthGuard } from '@modules/auth/jwt/gql-auth.guard';
import { IUserQuizResponseService } from '../../interfaces';
import { I_USER_QUIZ_SERVICE } from '@shared/utils/constants';
import { CurrentUser } from '@modules/auth/jwt/current-user.decorator';
import { UserTokenDTO } from '@modules/user/Dto';

@Resolver(() => UserQuizResponseType)
export class UserResponseQuizResolver {
  private readonly logger = new Logger('Quiz resolver');
  constructor(
    @Inject(I_USER_QUIZ_SERVICE)
    private readonly quizService: IUserQuizResponseService,
  ) {}
  @Query(() => UserQuizResponseType)
  @UseGuards(GqlAuthGuard)
  async UserQuizResponse(
    @Args('quiz') id: string,
    @CurrentUser() token: UserTokenDTO,
  ): Promise<UserQuizResponseType> {
    this.logger.log('quiz');

    return this.quizService.getUserQuizResponse(id, token.id);
  }
  @Mutation(() => UserQuizResponseType)
  @UseGuards(GqlAuthGuard)
  async createUserQuizResponse(
    @Args('input')
    { responses, lastQuestion, quiz, complete }: UserQuizResponseInputType,
    @CurrentUser() { id }: UserTokenDTO,
  ): Promise<UserQuizResponseType> {
    this.logger.log('Update quiz');

    return await this.quizService.createUserQuizResponse(
      {
        responses,
        lastQuestion,
        quiz,
        complete,
      },
      id,
    );
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
