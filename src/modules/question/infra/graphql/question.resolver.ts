import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Logger, Inject, UseGuards } from '@nestjs/common';
import { CreateQuestionInput, QuestionType } from './types';
import { GqlAuthGuard } from '@modules/auth/jwt/gql-auth.guard';
import { IQuestionService } from '../../interfaces';
import { I_USER_SERVICE } from '@shared/utils/constants';
import { GqlAdmAuthGuard } from '@modules/auth/jwt/gql-auth-admin.guard';
import { QuestionInputType } from './types/question.input';
import { QuestionDTO } from '@modules/question/Dto';

@Resolver(() => QuestionType)
export class QuestionResolver {
  private readonly logger = new Logger('Question resolver');
  constructor(
    @Inject(I_USER_SERVICE)
    private readonly questionService: IQuestionService,
  ) {}
  @Query(() => QuestionType)
  @UseGuards(GqlAdmAuthGuard)
  async question(@Args('question') id: string): Promise<QuestionType> {
    this.logger.log('question');

    return this.questionService.getQuestion(id);
  }
  @Mutation(() => QuestionType)
  @UseGuards(GqlAdmAuthGuard)
  async createQuestion(
    @Args('input') data: CreateQuestionInput,
  ): Promise<QuestionType> {
    this.logger.log('Update question');

    return await this.questionService.createQuestion(data);
  }
  @Mutation(() => Boolean)
  @UseGuards(GqlAdmAuthGuard)
  async updateQuestion(
    @Args('input')
    { id, enunciate, correctAnswers, alternatives }: QuestionInputType,
  ): Promise<boolean> {
    this.logger.log('Update question');

    return await this.questionService.updateQuestion(
      new QuestionDTO(id, enunciate, alternatives, correctAnswers),
    );
  }
  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteUser(@Args('question') id: string): Promise<boolean> {
    this.logger.log('Delete user');

    return await this.questionService.deleteQuestion(id);
  }
}
