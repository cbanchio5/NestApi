import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  signin() {
    return { msg: 'I have signed in' };
  }

  async signup(dto: AuthDto) {
    //generate the password hash

    const hash = await argon.hash(dto.password);

    //save the new user in db
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });

    delete user.hash;

    //return the saved user

    return user;

    return { msg: 'I have signup' };
  }
}
