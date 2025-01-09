import { IsEmail, IsString } from 'class-validator';

export class CreatePlayerDto {
  /**
   * @example John
   */
  @IsString()
  firstName: string;

  /**
   *  @example Doe
   */
  @IsString()
  lastName: string;

  /**
   * @example jhon@test.com
   */
  @IsEmail()
  email: string;

  /**
   * @example 123456789
   */
  @IsString()
  phoneNumber: string;
}
