import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateBuildingDto } from './create-building.dto';

export class UpdateBuildingDto extends PartialType(CreateBuildingDto) {
  @ApiPropertyOptional({
    description: 'Name of the model',
    example: 'Building A',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Total number of floors',
    example: '10',
  })
  totalFloor?: string;

  @ApiPropertyOptional({
    description: 'Latitude of the location',
    example: '-6.200000',
  })
  latitude?: string;

  @ApiPropertyOptional({
    description: 'Longitude of the location',
    example: '106.816666',
  })
  longitude?: string;

  @ApiPropertyOptional({
    description: 'Description of the model',
    example: 'A detailed description of Building A',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Image file of the model',
    type: 'string',
    format: 'binary',
  })
  image?: any;
}
