import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private prisma: PrismaService
  ) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    // First check if user exists
    const userExists: any = await this.prisma.$queryRaw`
      SELECT COUNT(*)::int as cnt
      FROM public.users
      WHERE email = ${email}
      AND is_active = true
      AND deleted_at IS NULL
    `;

    const userCount = userExists[0].cnt;

    if (userCount === 0) {
      // User doesn't exist
      throw new UnauthorizedException('User not found. Please register first.');
    }

    // User exists, now validate credentials
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      // User exists but password is incorrect
      throw new UnauthorizedException('Invalid password');
    }
    
    return user;
  }
}