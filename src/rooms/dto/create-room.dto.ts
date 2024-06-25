import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({
    description: 'Name of the room',
    example: 'Room A',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of the room',
    example: 'A description of Room A',
  })
  @IsString()
  description: string;

  @ApiPropertyOptional({
    description: 'Image file of the room',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  image?: any;

  @ApiProperty({
    description: 'ID of the building this room belongs to',
    example: 'ckoa8x6b80000z45o9u1j4n7m',
  })
  @IsString()
  @IsNotEmpty()
  buildingId: string;

  @ApiProperty({
    description: 'Floor where the room is located',
    example: '2nd Floor',
  })
  @IsString()
  @IsNotEmpty()
  floor: string;
}
