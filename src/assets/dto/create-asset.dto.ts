import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsEnum } from 'class-validator';

export enum AssetCondition {
  GOOD = 'good',
  BROKEN = 'broken',
}

export class CreateAssetDto {
  @ApiProperty({
    description: 'Name of the asset',
    example: 'Laptop',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the asset',
    example: 'Dell XPS 15',
  })
  @IsString()
  description: string;

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

  @ApiProperty({
    description: 'Quantity of the asset',
    example: 10,
  })
  @IsInt()
  quantity: number;

  @ApiProperty({
    description: 'Condition of the asset',
    enum: AssetCondition,
    example: AssetCondition.GOOD,
  })
  @IsEnum(AssetCondition)
  condition: AssetCondition;
}
