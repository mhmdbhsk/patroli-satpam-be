import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateReportBuildingDto {
  @ApiProperty({
    description: 'ID of the building',
    example: 'building_123',
  })
  @IsString()
  buildingId: string;

  @ApiProperty({
    description: 'Description of the report',
    example: 'Leaky roof on the third floor',
  })
  @IsString()
  description: string;

  @ApiPropertyOptional({
    description: 'Image of the report',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  image?: any;

  @ApiProperty({
    description: 'Latitude of the report location',
    example: '-7.0491198',
  })
  @IsString()
  latitude: string;

  @ApiProperty({
    description: 'Longitude of the report location',
    example: '110.4416823',
  })
  @IsString()
  longitude: string;
}
