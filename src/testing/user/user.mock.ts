import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from '../../user/entities/user.entity';

export const userListMock: User[] = [
  {
    id: '1',
    firstName: 'Test',
    lastName: 'User',
    email: 'teste1@example.com',
    phoneNumber: '1234567891',
  },
  {
    id: '2',
    firstName: 'Test',
    lastName: 'User',
    email: 'teste2@example.com',
    phoneNumber: '1234567892',
  },
  {
    id: '3',
    firstName: 'Test',
    lastName: 'User',
    email: 'teste3@example.com',
    phoneNumber: '1234567893',
  },
];

export const userMock: User = {
  id: '1',
  firstName: 'Test',
  lastName: 'User',
  email: 'teste1@example.com',
  phoneNumber: '1234567891',
};

export const userDtoMock: CreateUserDto = {
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  phoneNumber: '1234567890',
};
