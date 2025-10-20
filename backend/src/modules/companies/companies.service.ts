import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Company, Prisma } from '@prisma/client';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CompanyCreateInput): Promise<Company> {
    return this.prisma.company.create({
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

  async findAll(): Promise<Company[]> {
    return this.prisma.company.findMany({
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

  async findOne(id: string): Promise<Company | null> {
    return this.prisma.company.findUnique({
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
      },
    });
  }

  async findByUserId(userId: string): Promise<Company | null> {
    return this.prisma.company.findUnique({
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

  async update(id: string, data: Prisma.CompanyUpdateInput): Promise<Company> {
    return this.prisma.company.update({
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

  async remove(id: string): Promise<Company> {
    return this.prisma.company.delete({
      where: { id },
    });
  }

  async searchCompanies(query: {
    industry?: string;
    size?: string;
    location?: string;
  }): Promise<Company[]> {
    const where: Prisma.CompanyWhereInput = {};

    if (query.industry) {
      where.industry = {
        contains: query.industry,
        mode: 'insensitive',
      };
    }

    if (query.size) {
      where.size = query.size;
    }

    if (query.location) {
      where.address = {
        contains: query.location,
        mode: 'insensitive',
      };
    }

    return this.prisma.company.findMany({
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
      orderBy: {
        companyName: 'asc',
      },
    });
  }
}