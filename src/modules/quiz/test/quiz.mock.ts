import { CreateQuizDTO } from '../Dto';

export const mockCreateQuizParams: CreateQuizDTO = { name: 'teste' };

export const quizMock = {
  ...mockCreateQuizParams,
  id: 'f38dc152-6448-4e1f-ab05-1a9ff81a0e12',
  created_at: '2022-03-08 09:27:24.548 -0300',
  updated_at: '2022-03-08 09:27:24.548 -0300',
  questions: null,
};

export const updateQuizData = {
  ...quizMock,
  name: 'teste 1',
};

export const quizMockUpdated = Object.assign(quizMock, updateQuizData);
