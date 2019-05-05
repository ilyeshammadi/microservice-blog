import { IsString, IsUUID, IsInt } from 'class-validator';

export class CreateDto {
  @IsInt()
  readonly title: number

  @IsString()
  readonly content: string;

  @IsString()
  readonly authorId: string;

  @IsString()
  readonly articleId: string;
}
