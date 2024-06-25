import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateReportAssetDto {
  @ApiProperty({
    description: 'ID of the asset',
    example: 'asset_123',
  })
  @IsString()
  assetId: string;

  @ApiProperty({
    description: 'ID of the user',
    example: 'user_123',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Description of the report',
    example: 'Broken screen on the monitor',
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
}
