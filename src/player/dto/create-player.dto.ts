import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { isUnique } from 'src/utils/validations/isUniqueValidation/isUnique.decorator';

export class CreatePlayerDto {
  /**
   * @example John
   */
  @IsString()
  @IsNotEmpty()
  firstName: string;

  /**
   *  @example Doe
   */
  @IsString()
  @IsNotEmpty()
  lastName: string;

  /**
   * @example jhon@test.com
   */
  @IsEmail()
  @IsNotEmpty()
  @isUnique({ tableName: 'player', column: 'email' })
  email: string;

  /**
   * @example 123456789
   */
  @IsString()
  phoneNumber: string;
}
