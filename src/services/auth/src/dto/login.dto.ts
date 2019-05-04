export class LoginDto {
    @IsString()
    username: string

    @IsString()
    password: string
}