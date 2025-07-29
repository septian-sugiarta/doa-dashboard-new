import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() body: Record<string, any>) {
        const user: { access_token: string } = await this.authService.signIn(body.username, body.password);

        return user;
    }

    @UseGuards(AuthGuard)
    @Get('me')
    getProfile(@Request() req) {
        return req.user;
    }
}
