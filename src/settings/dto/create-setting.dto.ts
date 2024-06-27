import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateSettingDto {
  @ApiProperty({
    description: 'Name of the setting',
    example: 'SiteTitle',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Value of the setting',
    example: 'My Website',
  })
  @IsString()
  value: string;

  @ApiProperty({
    description: 'Description of the setting',
    example: 'The title of the website',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Unit of the setting',
    example: 'string',
  })
  @IsString()
  @IsOptional()
  unit: string;
}
