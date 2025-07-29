import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async signIn(username: string, password: string) {
        const user = await this.usersService.findByUsername(username);
        if (!user) {
            throw new UnauthorizedException();
        }


        if (password !== user.password) {
            throw new UnauthorizedException('Invalid password');
        }


        const payload = { sub: user.id, id_number: user.id_number, name: user.name, unit: user.unit, email: user.email, username: user.username, role: user.role };

        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
