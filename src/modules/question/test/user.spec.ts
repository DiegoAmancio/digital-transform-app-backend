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
    findUserByProp: jest.fn().mockReturnValue(userMock),
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
        mockCreateUserParams.email,
        mockCreateUserParams.name,
        mockCreateUserParams.password,
      );
      expect(userCreated).toBe(userMock);
    });
  });
  describe('When get user', () => {
    it('should be get user by data', async () => {
      const data = { id: userMock.id, email: userMock.email };
      const user = await service.getUser(data);

      expect(mockRepository.findUserByProp).toBeCalledWith(data);
      expect(user).toBe(userMock);
    });
    it('should be get user by token data', async () => {
      const user = service.getUser(null, tokenData);

      expect(mockRepository.findUserByProp).toBeCalledWith(tokenData);
      expect(user).resolves.toBe(userMock);
    });
    it('Should return a exception when does not to find a user', async () => {
      mockRepository.findUserByProp.mockReturnValue(null);

      const user = service.getUser({ id: userMock.id });

      expect(mockRepository.findUserByProp).toHaveBeenCalledWith({
        id: userMock.id,
      });
      expect(user).rejects.toThrow(NotFoundException);
    });
  });
  describe('When update User', () => {
    it('Should update a user', async () => {
      service.getUser = jest.fn().mockReturnValue(userMock);

      const userUpdated = await service.updateUser(updateUserData, tokenData);

      expect(service.getUser).toHaveBeenCalledWith({ id: tokenData.id });
      expect(mockRepository.updateUser).toHaveBeenCalledWith(userMockUpdated);
      expect(userUpdated).toBe('User updated');
    });
    it('Should return a exception when user atempt update another user', async () => {
      const userUpdated = service.updateUser(
        { ...updateUserData, id: '' },
        tokenData,
      );
      expect(userUpdated).rejects.toThrow(UnauthorizedException);
    });
  });
  describe('When delete User', () => {
    it('Should return a exception when atempt delete user not register', async () => {
      const userDeleted = service.deleteUser({ id: '213' });
      expect(userDeleted).rejects.toThrow(NotFoundException);
    });
    it('Should delete user', async () => {
      mockRepository.findUserByProp = jest.fn().mockReturnValue(userMock);
      const userDeleted = await service.deleteUser({ id: tokenData.id });

      expect(mockRepository.findUserByProp).toHaveBeenCalledWith({
        id: tokenData.id,
      });
      expect(mockRepository.deleteUser).toHaveBeenCalledWith(userMock);
      expect(userDeleted).toBe(true);
    });
  });
});
