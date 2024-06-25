import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateRoomDto } from './create-room.dto';
import { IsString, IsOptional } from 'class-validator';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
  @ApiPropertyOptional({
    description: 'Name of the room',
    example: 'Room A',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Description of the room',
    example: 'A description of Room A',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Image file of the room',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  image?: any;

  @ApiPropertyOptional({
    description: 'ID of the building this room belongs to',
    example: 'ckoa8x6b80000z45o9u1j4n7m',
  })
  @IsOptional()
  @IsString()
  buildingId?: string;

  @ApiPropertyOptional({
    description: 'Floor where the room is located',
    example: '2nd Floor',
  })
  @IsOptional()
  @IsString()
  floor?: string;
}
