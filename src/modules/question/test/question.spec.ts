import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { QuestionRepository } from '../infra/database';
import { IQuestionRepository } from '../interfaces';
import { QuestionService } from '../services';

import {
  questionMock,
  mockCreateQuestionParams,
  updateQuestionData,
} from './question.mock';
import {
  mockCreateQuizParams,
  quizMock,
  quizMockUpdated,
  updateQuizData,
} from '@modules/quiz/test/quiz.mock';
import { QuizRepository } from '@modules/quiz/infra/database';
import { IQuizRepository, IQuizService } from '@modules/quiz/interfaces';
import {
  I_QUESTION_SERVICE,
  I_QUIZ_SERVICE,
  QUESTION_DELETED,
  QUESTION_UPDATED,
} from '@shared/utils/constants';
import { QuizService } from '@modules/quiz/services';

describe('QuestionService', () => {
  let service: QuestionService;
  let repository: IQuestionRepository;

  const mockRepository = {
    getQuestion: jest.fn().mockReturnValue(questionMock),
    createAndSaveQuestion: jest.fn().mockReturnValue(questionMock),
    updateQuestion: jest.fn().mockReturnValue(true),
    deleteQuestion: jest.fn().mockReturnValue(true),
  };
  const mockQuizRepository = {
    getQuizFromDatabase: jest.fn().mockReturnValue(quizMock),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionService,
        {
          provide: QuestionRepository,
          useValue: mockRepository,
        },
        {
          provide: I_QUIZ_SERVICE,
          useValue: mockQuizRepository,
        },
      ],
    }).compile();

    service = module.get<QuestionService>(QuestionService);
    repository = module.get<IQuestionRepository>(QuestionRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
  describe('When create question', () => {
    it('should be create question', async () => {
      const questionCreated = await service.createQuestion(
        mockCreateQuestionParams,
      );
      expect(mockQuizRepository.getQuizFromDatabase).toBeCalledWith(
        mockCreateQuestionParams.quizId,
      );
      expect(mockRepository.createAndSaveQuestion).toBeCalledWith(
        mockCreateQuestionParams,
        quizMock,
      );
      expect(questionCreated).toStrictEqual(questionMock);
    });
  });
  describe('When get question', () => {
    it('should be get question', async () => {
      const question = await service.getQuestion(questionMock.id);

      expect(mockRepository.getQuestion).toBeCalledWith(questionMock.id);
      expect(question).toStrictEqual(questionMock);
    });
    it('Should return a exception when does not to find a question', async () => {
      mockRepository.getQuestion.mockReturnValue(null);
      const id = '23123123123';

      await expect(() => service.getQuestion(id)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockRepository.getQuestion).toHaveBeenCalledWith(id);
    });

    describe('When update question', () => {
      it('Should update question', async () => {
        mockRepository.updateQuestion.mockReturnValue(true);

        const questionUpdated = await service.updateQuestion(
          updateQuestionData,
        );

        expect(questionUpdated).toBe(QUESTION_UPDATED);
        expect(mockRepository.updateQuestion).toHaveBeenCalledWith(
          updateQuestionData,
          quizMock,
        );
      });

      it('Shouldnt update question', async () => {
        mockRepository.updateQuestion.mockReturnValue(false);
        const mock = { ...updateQuestionData, id: '' };
        await expect(() => service.updateQuestion(mock)).rejects.toThrow(
          NotFoundException,
        );
        expect(mockRepository.updateQuestion).toHaveBeenCalledWith(
          mock,
          quizMock,
        );
      });
    });
    describe('When delete question', () => {
      it('Should delete question', async () => {
        const questionDeleted = await service.deleteQuestion(questionMock.id);

        expect(mockRepository.deleteQuestion).toHaveBeenCalledWith(
          questionMock.id,
        );
        expect(questionDeleted).toBe(QUESTION_DELETED);
      });
      it('Should return a exception when atempt delete question not register', async () => {
        const id = '23123123123';
        mockRepository.deleteQuestion.mockReturnValue(false);

        expect(service.deleteQuestion(id)).rejects.toThrow(NotFoundException);
      });
    });
  });
});
