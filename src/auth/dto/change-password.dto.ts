import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email of the user',
    example: process.env.SUPERADMIN_EMAIL || 'string',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    description: 'Old password of the user',
    example: process.env.SUPERADMIN_PASSWORD || 'string',
  })
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    description: 'New password of the user',
    example: process.env.SUPERADMIN_PASSWORD || 'string',
  })
  newPassword: string;
}
