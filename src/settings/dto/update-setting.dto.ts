import { PartialType } from '@nestjs/swagger';
import { CreateSettingDto } from './create-setting.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateSettingDto extends PartialType(CreateSettingDto) {
  @ApiPropertyOptional({
    description: 'Name of the setting',
    example: 'SiteTitle',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Value of the setting',
    example: 'My Website',
  })
  @IsOptional()
  @IsString()
  value?: string;
}
