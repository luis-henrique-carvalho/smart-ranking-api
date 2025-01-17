import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { isUnique } from '../../utils/validations/isUniqueValidation/isUnique.decorator';

export class CreateUserDto {
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
  @isUnique({ tableName: 'User', column: 'email' })
  email: string;

  /**
   * @example 123456789
   */
  @IsString()
  @isUnique({ tableName: 'User', column: 'phoneNumber' })
  phoneNumber: string;
}
