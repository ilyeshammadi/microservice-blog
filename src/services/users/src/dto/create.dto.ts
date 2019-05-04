import { IsString, IsUUID, IsInt } from 'class-validator';

export class CreateDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}
