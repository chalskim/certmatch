import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { code_state_enum } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: {
        user_email: email,
        user_state: 'active' as code_state_enum,
        user_deleted_at: null,
      },
      select: {
        id: true,
        user_email: true,
        user_password_hash: true,
        user_display_name: true,
      },
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.user_password_hash);
    if (!isPasswordValid) {
      return null;
    }

    return {
      id: user.id,
      email: user.user_email,
      name: user.user_display_name,
      role: 'USER',
      isActive: true,
    };
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async register(createUserDto: any) {
    const exists = await this.prisma.user.count({
      where: { user_email: createUserDto.email, user_deleted_at: null },
    });
    if (exists > 0) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const created = await this.prisma.user.create({
      data: {
        user_email: createUserDto.email,
        user_password_hash: hashedPassword,
        user_password_algo: 'bcrypt',
        user_display_name: createUserDto.name ?? null,
        user_email_verified: false,
        user_state: 'active' as code_state_enum,
      },
      select: { id: true, user_email: true, user_display_name: true },
    });

    return this.login({
      id: created.id,
      email: created.user_email,
      name: created.user_display_name,
      role: 'USER',
    });
  }
}
