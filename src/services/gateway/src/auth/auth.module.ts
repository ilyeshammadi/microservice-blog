import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersService } from 'src/users/users.service';

@Module({
    providers: [AuthService, AuthResolver, UsersService]
})
export class AuthModule { }
