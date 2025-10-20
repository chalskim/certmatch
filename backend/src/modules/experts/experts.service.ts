import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Expert, Prisma } from '@prisma/client';

@Injectable()
export class ExpertsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ExpertCreateInput): Promise<Expert> {
    return this.prisma.expert.create({
      data,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            phone: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<Expert[]> {
    return this.prisma.expert.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            phone: true,
          },
        },
      },
    });
  }

  async findOne(id: string): Promise<Expert | null> {
    return this.prisma.expert.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            phone: true,
          },
        },
        applications: true,
        schedules: true,
        reviews: true,
      },
    });
  }

  async findByUserId(userId: string): Promise<Expert | null> {
    return this.prisma.expert.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            phone: true,
          },
        },
      },
    });
  }

  async update(id: string, data: Prisma.ExpertUpdateInput): Promise<Expert> {
    return this.prisma.expert.update({
      where: { id },
      data,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            phone: true,
          },
        },
      },
    });
  }

  async remove(id: string): Promise<Expert> {
    return this.prisma.expert.delete({
      where: { id },
    });
  }

  async searchExperts(query: {
    skills?: string[];
    certifications?: string[];
    minRating?: number;
    isAvailable?: boolean;
  }): Promise<Expert[]> {
    const where: Prisma.ExpertWhereInput = {};

    if (query.skills && query.skills.length > 0) {
      where.skills = {
        hasSome: query.skills,
      };
    }

    if (query.certifications && query.certifications.length > 0) {
      where.certifications = {
        hasSome: query.certifications,
      };
    }

    if (query.minRating !== undefined) {
      where.rating = {
        gte: query.minRating,
      };
    }

    if (query.isAvailable !== undefined) {
      where.isAvailable = query.isAvailable;
    }

    return this.prisma.expert.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            phone: true,
          },
        },
      },
      orderBy: [
        { rating: 'desc' },
        { reviewCount: 'desc' },
      ],
    });
  }
}