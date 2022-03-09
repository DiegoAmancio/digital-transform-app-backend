import { QuizRepository } from '@modules/quiz/infra/database';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { QUIZ_DELETED, QUIZ_UPDATED } from '@shared/utils/constants';
import { IQuizRepository } from '../interfaces';
import { QuizService } from '../services';

import {
  quizMock,
  mockCreateQuizParams,
  updateQuizData,
  quizMockUpdated,
} from './quiz.mock';

describe('QuizService', () => {
  let service: QuizService;
  let repository: IQuizRepository;
  const mockRepository = {
    getQuiz: jest.fn().mockReturnValue(quizMock),
    createAndSaveQuiz: jest.fn().mockReturnValue(quizMock),
    updateQuiz: jest.fn().mockReturnValue(quizMockUpdated),
    deleteQuiz: jest.fn().mockReturnValue(true),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizService,
        {
          provide: QuizRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<QuizService>(QuizService);
    repository = module.get<IQuizRepository>(QuizRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
  describe('When create quiz', () => {
    it('should be create quiz', async () => {
      const quizCreated = await service.createQuiz(mockCreateQuizParams);

      expect(mockRepository.createAndSaveQuiz).toBeCalledWith({
        name: mockCreateQuizParams.name,
      });
      expect(quizCreated).toStrictEqual(quizMock);
    });
  });
  describe('When get quiz', () => {
    it('should be get quiz', async () => {
      const quiz = service.getQuiz(quizMock.id);

      expect(mockRepository.getQuiz).toBeCalledWith(quizMock.id);
      expect(quiz).resolves.toStrictEqual(quizMock);
    });
    it('Should return a exception when does not to find a quiz', async () => {
      mockRepository.getQuiz.mockReturnValue(null);
      const id = '23123123123';

      expect(() => service.getQuiz(id)).rejects.toThrow(NotFoundException);
      expect(mockRepository.getQuiz).toHaveBeenCalledWith(id);
    });

    describe('When update quiz', () => {
      it('Should update quiz', async () => {
        mockRepository.updateQuiz.mockReturnValue(true);

        const quizUpdated = await service.updateQuiz(updateQuizData);

        expect(quizUpdated).toBe(QUIZ_UPDATED);
        expect(mockRepository.updateQuiz).toHaveBeenCalledWith(quizMockUpdated);
      });

      it('Shouldnt update quiz', async () => {
        mockRepository.updateQuiz.mockReturnValue(false);

        expect(() => service.updateQuiz(updateQuizData)).rejects.toThrow(
          NotFoundException,
        );
        expect(mockRepository.updateQuiz).toHaveBeenCalledWith(quizMockUpdated);
      });
    });
    describe('When delete quiz', () => {
      it('Should delete quiz', async () => {
        const quizDeleted = await service.deleteQuiz(quizMock.id);

        expect(mockRepository.deleteQuiz).toHaveBeenCalledWith(quizMock.id);
        expect(quizDeleted).toBe(QUIZ_DELETED);
      });
      it('Should return a exception when atempt delete quiz not register', async () => {
        const id = '23123123123';
        mockRepository.deleteQuiz.mockReturnValue(false);

        expect(service.deleteQuiz(id)).rejects.toThrow(NotFoundException);
      });
    });
  });
});
