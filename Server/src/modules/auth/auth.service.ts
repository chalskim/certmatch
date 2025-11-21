import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      // First check if user exists using raw SQL
      const userResult: any = await this.prisma.$queryRaw`
        SELECT user_id, email, password_hash, name, user_type as role, is_active
        FROM public.users
        WHERE email = ${email}
        AND is_active = true
        AND deleted_at IS NULL
      `;

      if (userResult.length === 0) {
        // User doesn't exist
        return null;
      }

      const user = userResult[0];
      
      // Verify password using bcrypt
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      
      if (isPasswordValid) {
        // Return user object without password
        const { password_hash, ...result } = user;
        return {
          id: user.user_id,
          email: user.email,
          name: user.name,
          role: user.role,
          isActive: user.is_active
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error validating user:', error);
      return null;
    }
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
    const existingUser = await this.usersService.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const { password, ...result } = user;
    return this.login(result);
  }
}