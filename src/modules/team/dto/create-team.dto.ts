import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTeamDto {
  /**
   * @example TeamName
   */
  @IsString()
  @IsNotEmpty()
  firstName: string;

  /**
   * @example This is a team description
   */
  @IsString()
  @IsNotEmpty()
  description: string;
}
