import { IsString } from 'class-validator';

export class GetDto {
  @IsString()
  id: string;
}
