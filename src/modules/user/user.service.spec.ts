import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { prismaMock } from '../../prisma/prisma.service.mock';
import {
  userDtoMock,
  userListMock,
  userMock,
} from '../../testing/user/user.mock';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);

    prismaMock.user.findUnique.mockClear();
    prismaMock.user.findMany.mockClear();
    prismaMock.user.create.mockClear();
    prismaMock.user.update.mockClear();
    prismaMock.user.delete.mockClear();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createdUser = { id: '1', ...userDtoMock };

      prismaMock.user.create.mockResolvedValue(createdUser);

      const result = await service.create(userDtoMock);

      expect(result).toEqual(createdUser);
      expect(prismaMock.user.create).toHaveBeenCalledWith({
        data: userDtoMock,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      prismaMock.user.findMany.mockResolvedValue(userListMock);

      const result = await service.findAll();

      expect(result).toEqual(userListMock);
      expect(prismaMock.user.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const id = userMock.id;

      prismaMock.user.findUnique.mockResolvedValue(userMock);

      const result = await service.findOne(id);

      expect(result).toEqual(userMock);
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });

    it('should return null if user not found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      const result = await service.findOne('non-existent-id');

      expect(result).toBeNull();
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'non-existent-id' },
      });
    });
  });

  describe('findOneByEmail', () => {
    it('should return a user by email', async () => {
      const email = userMock.email;

      prismaMock.user.findUnique.mockResolvedValue(userMock);

      const result = await service.findOneByEmail(email);

      expect(result).toEqual(userMock);
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { email },
      });
    });

    it('should return null if user not found by email', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      const result = await service.findOneByEmail('non-existent@example.com');

      expect(result).toBeNull();
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'non-existent@example.com' },
      });
    });
  });

  describe('update', () => {
    it('should update a user by ID', async () => {
      const id = userMock.id;
      const updateDto = { firstName: 'Updated firstName' };
      const updatedUser = { id, ...updateDto };

      prismaMock.user.update.mockResolvedValue(updatedUser);

      const result = await service.update(id, updateDto);

      expect(result).toEqual(updatedUser);
      expect(prismaMock.user.update).toHaveBeenCalledWith({
        where: { id },
        data: updateDto,
      });
    });
  });

  describe('remove', () => {
    it('should delete a user by ID', async () => {
      const id = userMock.id;

      prismaMock.user.delete.mockResolvedValue(userMock);

      const result = await service.remove(id);

      expect(result).toEqual(userMock);
      expect(prismaMock.user.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});
