import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Expert, Prisma } from '@prisma/client';
import { CreateExpertDto, UpdateExpertDto } from './dto/expert.dto';

@Injectable()
export class ExpertsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateExpertDto): Promise<Expert> {
    const {
      userId,
      name,
      bio,
      specialty,
      experienceYears,
      hourlyRate,
      dailyRate,
      location,
      languages,
      availability,
    } = dto;

    // Parse JSON-like strings for specialty and availability if provided
    const specialtyJson = specialty ? safeJsonParse(specialty) : undefined;
    const availabilityJson = availability ? safeJsonParse(availability) : undefined;

    return this.prisma.expert.create({
      data: {
        user: { connect: { id: userId } },
        name,
        bio,
        specialty: specialtyJson,
        experienceYears,
        hourlyRate,
        dailyRate,
        location,
        languages,
        availability: availabilityJson,
      },
      include: {
        user: {
          select: { id: true, email: true, name: true, phone: true },
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
        user: { select: { id: true, email: true, name: true, phone: true } },
      },
    });
  }

  async findByUserId(userId: string): Promise<Expert | null> {
    return this.prisma.expert.findUnique({
      where: { userId },
      include: {
        user: { select: { id: true, email: true, name: true, phone: true } },
      },
    });
  }

  async update(id: string, dto: UpdateExpertDto): Promise<Expert> {
    const {
      name,
      bio,
      specialty,
      experienceYears,
      hourlyRate,
      dailyRate,
      location,
      languages,
      availability,
    } = dto;

    const specialtyJson = specialty ? safeJsonParse(specialty) : undefined;
    const availabilityJson = availability ? safeJsonParse(availability) : undefined;

    return this.prisma.expert.update({
      where: { id },
      data: {
        name,
        bio,
        specialty: specialtyJson,
        experienceYears,
        hourlyRate,
        dailyRate,
        location,
        languages,
        availability: availabilityJson,
      },
      include: {
        user: { select: { id: true, email: true, name: true, phone: true } },
      },
    });
  }

  async remove(id: string): Promise<Expert> {
    return this.prisma.expert.delete({
      where: { id },
    });
  }

  async searchExperts(query: {
    location?: string;
    languages?: string[] | string;
    minRating?: number;
  }): Promise<Expert[]> {
    const where: Prisma.ExpertWhereInput = {};

    if (query.location) {
      where.location = query.location;
    }

    const langs = Array.isArray(query.languages)
      ? query.languages
      : typeof query.languages === 'string' && query.languages.length > 0
        ? query.languages.split(',').map((s) => s.trim()).filter(Boolean)
        : [];

    if (langs.length > 0) {
      where.languages = { hasSome: langs };
    }

    if (typeof query.minRating === 'number') {
      where.rating = { gte: query.minRating } as any; // rating is Decimal
    }

    return this.prisma.expert.findMany({
      where,
      include: {
        user: { select: { id: true, email: true, name: true, phone: true } },
      },
      orderBy: [
        { rating: 'desc' },
        { reviewCount: 'desc' },
      ],
    });
  }
}

function safeJsonParse(value: string): Prisma.InputJsonValue | undefined {
  try {
    return JSON.parse(value);
  } catch {
    return value as unknown as Prisma.InputJsonValue;
  }
}