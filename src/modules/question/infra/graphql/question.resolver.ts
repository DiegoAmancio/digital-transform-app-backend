import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Logger, Inject, UseGuards } from '@nestjs/common';
import { CreateQuestionInput, QuestionType } from './types';
import { GqlAuthGuard } from '@modules/auth/jwt/gql-auth.guard';
import { IQuestionService } from '../../interfaces';
import { GqlAdmAuthGuard } from '@modules/auth/jwt/gql-auth-admin.guard';
import { QuestionInputType } from './types/question.input';
import { QuestionDTO } from '@modules/question/Dto';
import { I_QUESTION_SERVICE } from '@shared/utils/constants';

@Resolver(() => QuestionType)
export class QuestionResolver {
  private readonly logger = new Logger('Question resolver');
  constructor(
    @Inject(I_QUESTION_SERVICE)
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
    { id, enunciate, correctAnswers, alternatives, quizId }: QuestionInputType,
  ): Promise<string> {
    this.logger.log('Update question');

    return await this.questionService.updateQuestion(
      new QuestionDTO(id, enunciate, alternatives, correctAnswers, quizId),
    );
  }
  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteQuestion(@Args('question') id: string): Promise<string> {
    this.logger.log('Delete question');

    return await this.questionService.deleteQuestion(id);
  }
}
