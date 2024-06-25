import { PartialType } from '@nestjs/swagger';
import { CreateReportRoomDto } from './create-report-room.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateReportRoomDto extends PartialType(CreateReportRoomDto) {
  @ApiPropertyOptional({
    description: 'ID of the room',
    example: 'room_123',
  })
  @IsOptional()
  @IsString()
  roomId?: string;

  @ApiPropertyOptional({
    description: 'ID of the user',
    example: 'user_123',
  })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiPropertyOptional({
    description: 'Description of the report',
    example: 'Broken window in room 205',
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
