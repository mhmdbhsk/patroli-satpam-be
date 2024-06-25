import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

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
}
