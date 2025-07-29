import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) { }

    async findByUsername(username: string) {
        const user = await this.prismaService.user.findFirst({
            where: {
                username: username,
            }
        });
        return user;
    }

    async getUser(email: string) {
        try {
            return await this.prismaService.user.findUnique({
                where: {
                    email: email,
                },
            });
        } catch (error) {
            console.error('Error fetching NcrForm:', error);
            throw error;
        }
    }


    async createUser(data: CreateUserDto) {
        try {
            const user = await this.prismaService.user.create({
                data: {
                    ...data,
                    password: data.password,
                },
            });

            return user;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }





    async changePassword(email: string, newPassword: string, oldPassword: string) {
        try {

            const isOldPasswordValid = await this.validateOldPassword(email, oldPassword);
            if (!isOldPasswordValid) {
                throw new Error('Old password is incorrect');
            }

            return await this.prismaService.user.update({
                where: { email: email },
                data: {
                    password: newPassword,
                },
            });
        } catch (error) {
            console.error('Error updating password:', error);
            throw error;
        }
    }

    async validateOldPassword(email: string, oldPassword: string): Promise<boolean> {
        const user = await this.prismaService.user.findUnique({
            where: { email: email },
        });

        if (!user) {
            return false;
        }

        return oldPassword === user.password;
    }




    async deleteUser(email: string, password: string) {
        try {
            const user = await this.prismaService.user.findUnique({
                where: {
                    email: email,
                },
            });

            if (!user || user.password !== password) {
                throw new Error('Invalid email or password');
            }

            return await this.prismaService.user.delete({
                where: {
                    email: email,
                },
            });
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }

}