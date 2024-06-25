import { PartialType } from '@nestjs/swagger';
import { CreateReportBuildingDto } from './create-report-building.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateReportBuildingDto extends PartialType(
  CreateReportBuildingDto,
) {
  @ApiPropertyOptional({
    description: 'ID of the building',
    example: 'building_123',
  })
  @IsOptional()
  @IsString()
  buildingId?: string;

  @ApiPropertyOptional({
    description: 'ID of the user',
    example: 'user_123',
  })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiPropertyOptional({
    description: 'Description of the report',
    example: 'Leaky roof on the third floor',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Image of the report',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  image?: any;

  @ApiPropertyOptional({
    description: 'Latitude of the report location',
    example: '-7.0491198',
  })
  @IsOptional()
  @IsString()
  latitude?: string;

  @ApiPropertyOptional({
    description: 'Longitude of the report location',
    example: '110.4416823',
  })
  @IsOptional()
  @IsString()
  longitude?: string;
}
