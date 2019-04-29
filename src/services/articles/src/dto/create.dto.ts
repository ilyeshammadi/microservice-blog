import { IsString, IsUUID } from 'class-validator';

export class CreateDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsString()
  readonly authorId: string;
}
