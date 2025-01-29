import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TeamService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    try {
      return await this.prisma.team.create({
        data: createTeamDto,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(): Promise<Team[]> {
    try {
      return await this.prisma.team.findMany();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string): Promise<Team> {
    try {
      return await this.prisma.team.findUnique({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(error.meta.cause);
      }
      throw new BadRequestException(error);
    }
  }

  async update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
    try {
      return await this.prisma.team.update({
        where: { id },
        data: updateTeamDto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(error.meta.cause);
      }
      throw new BadRequestException(error);
    }
  }

  async remove(id: string): Promise<Team> {
    try {
      return await this.prisma.team.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(error.meta.cause);
      }
      throw new BadRequestException(error);
    }
  }
}
