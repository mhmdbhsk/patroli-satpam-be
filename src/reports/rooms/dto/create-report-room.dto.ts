import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateReportRoomDto {
  @ApiProperty({
    description: 'ID of the room',
    example: 'room_123',
  })
  @IsString()
  roomId: string;

  @ApiProperty({
    description: 'ID of the user',
    example: 'user_123',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Description of the report',
    example: 'Broken window in room 205',
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
