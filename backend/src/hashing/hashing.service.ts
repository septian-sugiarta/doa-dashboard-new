import { Injectable } from '@nestjs/common';

@Injectable()
export class HashingService {

    async hash(password: string): Promise<string> {
        return password;
    }

    async compare(password: string, hashedPassword: string): Promise<boolean> {
        return password === hashedPassword;
    }
}
