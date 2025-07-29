import { Controller, Get, Post, Param, Body, HttpException, Delete, Put, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from './users.service';

interface CreateUserDto {
    id_number: number;
    name: string;
    unit: string;
    role: string;
    username: string;
    password: string;
    email: string;
}

interface UpdateUserDto {
    id_number?: number;
    name?: string;
    unit?: string;
    role?: string;
    username?: string;
    password?: string;
    email?: string;
}

@Controller('users')
export class UsersController {
    constructor(private prisma: PrismaService, private usersService: UsersService) { }

    @Get()
    async getUsers() {
        return await this.prisma.user.findMany();
    }

    @Post()
    async createUser(@Body() user: CreateUserDto) {
        try {
            await this.usersService.createUser({
                ...user,
            });
            return { success: true };
        } catch (error) {
            console.error(error);
            throw new HttpException('Error creating NcrForm', 500);
        }
    }

    @Get(':id')
    async getUser(@Param('id') id: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: +id
            }
        });
        if (!user) {
            throw new HttpException('User not found', 404);
        }
        return user;
    }



    @Post('delete')
    async deleteUser(@Body() body: { email: string, password: string }) {
        try {
            const { email, password } = body;

            await this.usersService.deleteUser(email, password);

            return { success: true };
        } catch (error) {
            console.error(error);
            throw new HttpException('Error deleting user', 500);
        }
    }


    @Put('change-password/:email')
    async changePassword(
        @Param('email') email: string,
        @Body() user: { old_password: string, new_password: string }
    ) {
        try {
            await this.usersService.changePassword(email, user.new_password, user.old_password);
            return { success: true, message: 'Password successfully updated' };
        } catch (error) {
            console.error(error);
            throw new HttpException(error.message || 'Error updating password', 500);
        }
    }
    @Post('validate-old-password/:email')
    async validateOldPassword(
        @Param('email') email: string,
        @Body() user: { password: string }
    ) {
        try {
            console.log(`Validating password for email: ${email}`);
            console.log(`Password received: ${user.password}`);

            const isValid = await this.usersService.validateOldPassword(email, user.password);
            console.log('Is valid password:', isValid);

            if (!isValid) {
                throw new HttpException('Old password is incorrect', 400);
            }

            return { isValid: true };
        } catch (error) {
            console.error(error);
            throw new HttpException(error.message || 'Error validating password', 500);
        }
    }

}
