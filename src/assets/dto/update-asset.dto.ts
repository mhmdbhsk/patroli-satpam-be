import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { AssetCondition, CreateAssetDto } from './create-asset.dto';
import { IsString, IsOptional, IsInt, IsEnum } from 'class-validator';

export class UpdateAssetDto extends PartialType(CreateAssetDto) {
  @ApiPropertyOptional({
    description: 'Name of the asset',
    example: 'Laptop',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Description of the asset',
    example: 'Dell XPS 15',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Image of the asset',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  image?: any;

  @ApiPropertyOptional({
    description: 'Notes about the asset',
    example: 'Used for presentations',
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({
    description: 'ID of the room where the asset is located',
    example: 'room_123',
  })
  @IsOptional()
  @IsString()
  roomId?: string;

  @ApiPropertyOptional({
    description: 'Quantity of the asset',
    example: 10,
  })
  @IsOptional()
  @IsInt()
  quantity?: number;

  @ApiPropertyOptional({
    description: 'Condition of the asset',
    enum: AssetCondition,
    example: AssetCondition.GOOD,
  })
  @IsOptional()
  @IsEnum(AssetCondition)
  condition?: AssetCondition;
}
