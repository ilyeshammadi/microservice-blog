import { IsString } from 'class-validator';

export class DeleteDto {
    @IsString()
    id: string;
}
