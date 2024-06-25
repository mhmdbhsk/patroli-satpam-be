import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBuildingDto {
  @ApiProperty({
    description: 'Name of the model',
    example: 'Building A',
  })
  name: string;

  @ApiProperty({
    description: 'Total number of floors',
    example: '10',
  })
  totalFloor: string;

  @ApiProperty({
    description: 'Latitude of the location',
    example: '-6.200000',
  })
  latitude: string;

  @ApiProperty({
    description: 'Longitude of the location',
    example: '106.816666',
  })
  longitude: string;

  @ApiProperty({
    description: 'Description of the model',
    example: 'A detailed description of Building A',
  })
  description: string;

  @ApiPropertyOptional({
    type: 'buffer',
    enum: ['image/jpeg', 'image/png'],
    format: 'binary',
    description: 'Image URL of the model',
  })
  image?: any;
}
