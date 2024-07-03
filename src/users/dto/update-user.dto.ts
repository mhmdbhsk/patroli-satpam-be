import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    description: 'Name of the user',
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Email of the user',
    example: 'john.doe@example.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'Image file of the user',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  image?: any;

  @ApiPropertyOptional({
    description: 'Password of the user',
    example: 'password123',
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional({
    description: 'Role of the user',
    enum: ['admin', 'security'],
    example: 'admin',
  })
  @IsOptional()
  @IsEnum(['admin', 'security'])
  role?: 'admin' | 'security';
}
