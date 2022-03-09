import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Logger, Inject, UseGuards } from '@nestjs/common';
import { CreateQuizInput, QuizType } from './types';
import { GqlAuthGuard } from '@modules/auth/jwt/gql-auth.guard';
import { IQuizService } from '../../interfaces';
import { I_QUIZ_SERVICE } from '@shared/utils/constants';
import { GqlAdmAuthGuard } from '@modules/auth/jwt/gql-auth-admin.guard';
import { QuizInputType } from './types/quiz.input';

@Resolver(() => QuizType)
export class QuizResolver {
  private readonly logger = new Logger('Quiz resolver');
  constructor(
    @Inject(I_QUIZ_SERVICE)
    private readonly quizService: IQuizService,
  ) {}
  @Query(() => QuizType)
  @UseGuards(GqlAdmAuthGuard)
  async quiz(@Args('quiz') id: string): Promise<QuizType> {
    this.logger.log('quiz');

    return this.quizService.getQuiz(id);
  }
  @Mutation(() => QuizType)
  @UseGuards(GqlAdmAuthGuard)
  async createQuiz(
    @Args('input') { name }: CreateQuizInput,
  ): Promise<QuizType> {
    this.logger.log('Update quiz');

    return await this.quizService.createQuiz({ name });
  }
  @Mutation(() => Boolean)
  @UseGuards(GqlAdmAuthGuard)
  async updateQuiz(
    @Args('input') { id, name }: QuizInputType,
  ): Promise<string> {
    this.logger.log('Update quiz');

    return await this.quizService.updateQuiz({ id, name });
  }
  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteUser(@Args('quiz') id: string): Promise<string> {
    this.logger.log('Delete user');

    return await this.quizService.deleteQuiz(id);
  }
}
