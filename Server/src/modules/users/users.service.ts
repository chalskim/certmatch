import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { isUUID } from 'class-validator';

// Define the UserWithoutPassword type to match what we're selecting
type UserWithoutPassword = {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  role: any;
  isActive: boolean | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async findAll(): Promise<UserWithoutPassword[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: string): Promise<UserWithoutPassword | null> {
    // Validate UUID to avoid Prisma errors when invalid IDs are passed
    if (!isUUID(id)) {
      throw new BadRequestException('유효하지 않은 사용자 ID 형식입니다. UUID 형식이어야 합니다.');
    }

    try {
      return await this.prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error: any) {
      // Provide a clearer message if the underlying DB driver throws UUID parsing errors
      const msg = typeof error?.message === 'string' ? error.message : '';
      if (msg.includes('UUID') || msg.includes('invalid character')) {
        throw new BadRequestException('사용자 조회 중 UUID 파싱 오류가 발생했습니다. ID 값을 확인해주세요.');
      }
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<UserWithoutPassword> {
    if (!isUUID(id)) {
      throw new BadRequestException('유효하지 않은 사용자 ID 형식입니다. UUID 형식이어야 합니다.');
    }

    try {
      return await this.prisma.user.update({
        where: { id },
        data,
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error: any) {
      const msg = typeof error?.message === 'string' ? error.message : '';
      if (msg.includes('UUID') || msg.includes('invalid character')) {
        throw new BadRequestException('사용자 수정 중 UUID 파싱 오류가 발생했습니다. ID 값을 확인해주세요.');
      }
      throw error;
    }
  }

  async remove(id: string): Promise<User> {
    if (!isUUID(id)) {
      throw new BadRequestException('유효하지 않은 사용자 ID 형식입니다. UUID 형식이어야 합니다.');
    }

    try {
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error: any) {
      const msg = typeof error?.message === 'string' ? error.message : '';
      if (msg.includes('UUID') || msg.includes('invalid character')) {
        throw new BadRequestException('사용자 삭제 중 UUID 파싱 오류가 발생했습니다. ID 값을 확인해주세요.');
      }
      throw error;
    }
  }
}