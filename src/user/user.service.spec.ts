import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { prismaMock } from '../prisma/prisma.service.mock';
import { CreateUserDto } from './dto/create-user.dto';

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
      const dto: CreateUserDto = {
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        phoneNumber: '1234567890',
      };

      const createdUser = { id: '1', ...dto };

      prismaMock.user.create.mockResolvedValue(createdUser);

      const result = await service.create(dto);

      expect(result).toEqual(createdUser);
      expect(prismaMock.user.create).toHaveBeenCalledWith({ data: dto });
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [
        { id: '1', email: 'user1@example.com', firstName: 'User 1' },
        { id: '2', email: 'user2@example.com', firstName: 'User 2' },
      ];

      prismaMock.user.findMany.mockResolvedValue(users);

      const result = await service.findAll();

      expect(result).toEqual(users);
      expect(prismaMock.user.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const id = '1';
      const user = { id, email: 'test@example.com', firstName: 'Test User' };

      prismaMock.user.findUnique.mockResolvedValue(user);

      const result = await service.findOne(id);

      expect(result).toEqual(user);
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
      const email = 'test@example.com';
      const user = { id: '1', email, firstName: 'Test User' };

      prismaMock.user.findUnique.mockResolvedValue(user);

      const result = await service.findOneByEmail(email);

      expect(result).toEqual(user);
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
      const id = '1';
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
      const id = '1';
      const deletedUser = {
        id,
        email: 'test@example.com',
        firstName: 'Test User',
      };

      prismaMock.user.delete.mockResolvedValue(deletedUser);

      const result = await service.remove(id);

      expect(result).toEqual(deletedUser);
      expect(prismaMock.user.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});
