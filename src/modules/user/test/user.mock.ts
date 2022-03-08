import { CreateUserDTO } from '../Dto';

export const mockCreateUserParams: CreateUserDTO = new CreateUserDTO(
  '438fd27e-9870-4bdb-8726-47625545670d',
  'topEmail@gmail.com',
  'toptopado',
);

export const userMock = {
  ...mockCreateUserParams,
  isAdmin: false,
  created_at: '2021-09-29T23:40:24.198Z',
  updated_at: '2021-09-29T23:40:24.198Z',
};

export const updateUserData = {
  id: userMock.id,
  email: 'topEmail@gmail.com',
  name: 'Opa man',
};

export const userMockUpdated = Object.assign(userMock, updateUserData);
export const tokenData = {
  id: userMock.id,
  email: userMock.email,
  isAdmin: userMock.isAdmin,
};
