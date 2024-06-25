import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateReportAssetDto } from './create-report-asset.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateReportAssetDto extends PartialType(CreateReportAssetDto) {
  @ApiPropertyOptional({
    description: 'ID of the asset',
    example: 'asset_123',
  })
  @IsOptional()
  @IsString()
  assetId?: string;

  @ApiPropertyOptional({
    description: 'ID of the user',
    example: 'user_123',
  })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiPropertyOptional({
    description: 'Description of the report',
    example: 'Broken screen on the monitor',
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
}
