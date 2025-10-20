import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ExpertsService } from './experts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Experts')
@Controller('experts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ExpertsController {
  constructor(private readonly expertsService: ExpertsService) {}

  @Post()
  @ApiOperation({ summary: 'Create expert profile' })
  @ApiResponse({ status: 201, description: 'Expert profile created successfully' })
  create(@Body() createExpertDto: any) {
    return this.expertsService.create(createExpertDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all experts' })
  @ApiResponse({ status: 200, description: 'Return all experts' })
  findAll() {
    return this.expertsService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search experts by criteria' })
  @ApiResponse({ status: 200, description: 'Return filtered experts' })
  @ApiQuery({ name: 'skills', required: false, type: [String] })
  @ApiQuery({ name: 'certifications', required: false, type: [String] })
  @ApiQuery({ name: 'minRating', required: false, type: Number })
  @ApiQuery({ name: 'isAvailable', required: false, type: Boolean })
  searchExperts(
    @Query('skills') skills?: string[],
    @Query('certifications') certifications?: string[],
    @Query('minRating') minRating?: number,
    @Query('isAvailable') isAvailable?: boolean,
  ) {
    return this.expertsService.searchExperts({
      skills,
      certifications,
      minRating,
      isAvailable,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get expert by ID' })
  @ApiResponse({ status: 200, description: 'Return expert by ID' })
  @ApiResponse({ status: 404, description: 'Expert not found' })
  findOne(@Param('id') id: string) {
    return this.expertsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update expert profile' })
  @ApiResponse({ status: 200, description: 'Expert profile updated successfully' })
  @ApiResponse({ status: 404, description: 'Expert not found' })
  update(@Param('id') id: string, @Body() updateExpertDto: any) {
    return this.expertsService.update(id, updateExpertDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete expert profile' })
  @ApiResponse({ status: 200, description: 'Expert profile deleted successfully' })
  @ApiResponse({ status: 404, description: 'Expert not found' })
  remove(@Param('id') id: string) {
    return this.expertsService.remove(id);
  }
}