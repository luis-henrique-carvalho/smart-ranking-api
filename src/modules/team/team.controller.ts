import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ApiResponse } from '@nestjs/swagger';
import { BadRequestDto, NotFoundDto } from '../../utils/dto/error-response.dto';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  @ApiResponse({ status: 400, description: 'Bad Request', type: BadRequestDto })
  async create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.create(createTeamDto);
  }

  @Get()
  async findAll() {
    return this.teamService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 404, description: 'Not Found', type: NotFoundDto })
  async findOne(@Param('id') id: string) {
    return this.teamService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 404, description: 'Not Found', type: NotFoundDto })
  async update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.update(id, updateTeamDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.teamService.remove(id);
  }
}
