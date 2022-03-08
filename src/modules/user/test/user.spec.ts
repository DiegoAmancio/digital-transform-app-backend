import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../infra/database';
import { IUserRepository } from '../interfaces';
import { UserService } from '../services';
import {
  userMock,
  mockCreateUserParams,
  updateUserData,
  userMockUpdated,
  tokenData,
} from './user.mock';

describe('UserService', () => {
  let service: UserService;
  let repository: IUserRepository;
  const mockRepository = {
    getUser: jest.fn().mockReturnValue(userMock),
    createAndSaveUser: jest.fn().mockReturnValue(userMock),
    updateUser: jest.fn().mockReturnValue(userMockUpdated),
    deleteUser: jest.fn().mockReturnValue(true),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<IUserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
  describe('When create user', () => {
    it('should be create user', async () => {
      const userCreated = await service.createUser(mockCreateUserParams);

      expect(mockRepository.createAndSaveUser).toBeCalledWith(
        mockCreateUserParams.id,
        mockCreateUserParams.email,
        mockCreateUserParams.name,
      );
      expect(userCreated).toBe(userMock);
    });
  });
  describe('When get user', () => {
    it('should be get user by data', async () => {
      const data = tokenData;
      const user = service.getUser(data);

      expect(mockRepository.getUser).toBeCalledWith(data.id);
      expect(user).resolves.toBe(userMock);
    });
    it('Should return a exception when does not to find a user', async () => {
      mockRepository.getUser.mockReturnValue(null);
      const mockData = {
        id: '23123123123',
        email: '31@gmail.com',
        isAdmin: false,
      };
      expect(() => service.getUser(mockData)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockRepository.getUser).toHaveBeenCalledWith(mockData.id);
    });

    describe('When update User', () => {
      it('Should update a user', async () => {
        mockRepository.getUser.mockReturnValue(userMock);
        mockRepository.updateUser.mockReturnValue(userMockUpdated);

        const userUpdated = await service.updateUser(updateUserData, tokenData);

        expect(userUpdated).toBe('User updated');
        expect(mockRepository.getUser).toHaveBeenCalledWith(tokenData.id);
        expect(mockRepository.updateUser).toHaveBeenCalledWith(userMockUpdated);
      });

      it('Should return a exception when user atempt update another user', () => {
        expect(() =>
          service.updateUser({ ...updateUserData, id: '' }, tokenData),
        ).rejects.toThrow(UnauthorizedException);
      });
    });
    describe('When delete User', () => {
      it('Should return a exception when atempt delete user not register', async () => {
        mockRepository.getUser.mockReturnValue(null);

        await expect(() =>
          service.deleteUser({
            id: '23123123123',
            email: '31@gmail.com',
            isAdmin: false,
          }),
        ).rejects.toThrow(NotFoundException);
      });
      it('Should delete user', async () => {
        mockRepository.getUser.mockReturnValue(userMock);
        const userDeleted = await service.deleteUser(tokenData);

        expect(mockRepository.getUser).toHaveBeenCalledWith(tokenData.id);
        expect(mockRepository.deleteUser).toHaveBeenCalledWith(userMock);
        expect(userDeleted).toBe(true);
      });
    });
  });
});
