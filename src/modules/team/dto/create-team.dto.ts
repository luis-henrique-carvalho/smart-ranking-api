import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTeamDto {
  /**
   * @example TeamName
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * @example "Team Description"
   */
  @IsString()
  @IsNotEmpty()
  description: string;
}
