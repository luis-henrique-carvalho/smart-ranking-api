/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';
import { IsUniqeInterface } from './isUnique.decorator';

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    const { tableName, column }: IsUniqeInterface = args.constraints[0];

    const model = this.prisma[tableName];

    if (!model) {
      throw new Error(`Model ${tableName} not found in Prisma client`);
    }

    const dataExist = await model.findUnique({
      where: { [column]: value },
    });

    return !dataExist;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    const field: string = validationArguments.property;
    return `Duplicate value: ${field} already exists`;
  }
}
