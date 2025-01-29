import { ApiProperty } from '@nestjs/swagger';

export class BadRequestDto {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: ['Invalid input data'] })
  message: [string];

  @ApiProperty({ example: '/exemple' })
  path: string;

  @ApiProperty({ example: '2021-09-22T12:00:00.000Z' })
  timestamp: string;
}

export class NotFoundDto {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: 'Team with ID 1 not found' })
  message: string;

  @ApiProperty({ example: '/exemple/1' })
  path: string;

  @ApiProperty({ example: '2021-09-22T12:00:00.000Z' })
  timestamp: string;
}
