import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

// Zod 스키마 정의
export const CreateExpertSchema = z.object({
  userId: z.string().uuid('Invalid user ID format'),
  specialization: z.string().min(2, 'Specialization must be at least 2 characters'),
  experience: z.number().int().min(0, 'Experience must be a positive number'),
  certifications: z.array(z.string()).optional(),
  bio: z.string().optional(),
  hourlyRate: z.number().positive('Hourly rate must be positive').optional(),
  availability: z.string().optional(),
});

export const UpdateExpertSchema = z.object({
  specialization: z.string().min(2, 'Specialization must be at least 2 characters').optional(),
  experience: z.number().int().min(0, 'Experience must be a positive number').optional(),
  certifications: z.array(z.string()).optional(),
  bio: z.string().optional(),
  hourlyRate: z.number().positive('Hourly rate must be positive').optional(),
  availability: z.string().optional(),
});

export const ExpertQuerySchema = z.object({
  specialization: z.string().optional(),
  minExperience: z.number().int().min(0).optional(),
  maxHourlyRate: z.number().positive().optional(),
  certifications: z.string().optional(),
});

// DTO 클래스들
export class CreateExpertDto {
  @ApiProperty({ description: 'User ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  userId: string;

  @ApiProperty({ description: 'Expert specialization', example: 'Software Development' })
  specialization: string;

  @ApiProperty({ description: 'Years of experience', example: 5 })
  experience: number;

  @ApiProperty({ 
    description: 'List of certifications', 
    example: ['AWS Certified', 'Google Cloud Professional'],
    required: false 
  })
  certifications?: string[];

  @ApiProperty({ 
    description: 'Expert biography', 
    example: 'Experienced software developer with expertise in cloud technologies',
    required: false 
  })
  bio?: string;

  @ApiProperty({ description: 'Hourly rate in USD', example: 100, required: false })
  hourlyRate?: number;

  @ApiProperty({ 
    description: 'Availability schedule', 
    example: 'Monday-Friday 9AM-5PM',
    required: false 
  })
  availability?: string;
}

export class UpdateExpertDto {
  @ApiProperty({ description: 'Expert specialization', example: 'Software Development', required: false })
  specialization?: string;

  @ApiProperty({ description: 'Years of experience', example: 5, required: false })
  experience?: number;

  @ApiProperty({ 
    description: 'List of certifications', 
    example: ['AWS Certified', 'Google Cloud Professional'],
    required: false 
  })
  certifications?: string[];

  @ApiProperty({ 
    description: 'Expert biography', 
    example: 'Experienced software developer with expertise in cloud technologies',
    required: false 
  })
  bio?: string;

  @ApiProperty({ description: 'Hourly rate in USD', example: 100, required: false })
  hourlyRate?: number;

  @ApiProperty({ 
    description: 'Availability schedule', 
    example: 'Monday-Friday 9AM-5PM',
    required: false 
  })
  availability?: string;
}

export class ExpertQueryDto {
  @ApiProperty({ description: 'Filter by specialization', example: 'Software Development', required: false })
  specialization?: string;

  @ApiProperty({ description: 'Minimum years of experience', example: 3, required: false })
  minExperience?: number;

  @ApiProperty({ description: 'Maximum hourly rate', example: 150, required: false })
  maxHourlyRate?: number;

  @ApiProperty({ description: 'Filter by certifications', example: 'AWS', required: false })
  certifications?: string;
}

export class ExpertResponseDto {
  @ApiProperty({ description: 'Expert ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ description: 'User ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  userId: string;

  @ApiProperty({ description: 'Expert specialization', example: 'Software Development' })
  specialization: string;

  @ApiProperty({ description: 'Years of experience', example: 5 })
  experience: number;

  @ApiProperty({ 
    description: 'List of certifications', 
    example: ['AWS Certified', 'Google Cloud Professional'] 
  })
  certifications: string[];

  @ApiProperty({ 
    description: 'Expert biography', 
    example: 'Experienced software developer with expertise in cloud technologies' 
  })
  bio: string;

  @ApiProperty({ description: 'Hourly rate in USD', example: 100 })
  hourlyRate: number;

  @ApiProperty({ description: 'Availability schedule', example: 'Monday-Friday 9AM-5PM' })
  availability: string;

  @ApiProperty({ description: 'Created at', example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated at', example: '2024-01-01T00:00:00.000Z' })
  updatedAt: Date;

  @ApiProperty({ description: 'User information' })
  user: {
    id: string;
    email: string;
    name: string;
    phone: string;
  };
}