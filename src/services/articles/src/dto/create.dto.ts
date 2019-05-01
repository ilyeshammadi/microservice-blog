import { IsString, IsUUID, IsInt } from 'class-validator';

export class CreateDto {
  // @IsString()
  // readonly title: string;

  @IsInt()
  readonly title: number

  @IsString()
  readonly content: string;

  @IsString()
  readonly authorId: string;
}
