import { CreateQuestionDTO, QuestionDTO } from '../Dto';

export const mockCreateQuestionParams: CreateQuestionDTO = {
  enunciate: 'enunciado top topado 2',
  alternatives: ['text1', 'text2', 'text1', 'text1'],
  correctAnswers: [1, 2],
  quizId: 'f38dc152-6448-4e1f-ab05-1a9ff81a0e13',
};

export const questionMock = {
  ...mockCreateQuestionParams,
  id: 'f38dc152-6448-4e1f-ab05-1a9ff81a0e12',
  created_at: new Date('2022-03-08 09:27:24.548 -0300'),
  updated_at: new Date('2022-03-08 09:27:24.548 -0300'),
};

export const updateQuestionData: QuestionDTO = {
  ...questionMock,
  enunciate: 'enunciado top topado 3',
  quizId: 'f38dc152-6448-4e1f-ab05-1a9ff81a0e111',
};
