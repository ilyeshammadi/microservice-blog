import { IsBoolean, IsInt, IsString, Length, Max, Min } from 'class-validator';

export class UpdateDto {
  @IsString()
  id: string;

  @IsBoolean()
  title: boolean;

  @IsString()
  content: string;

  @IsString()
  authorId: string;
}
