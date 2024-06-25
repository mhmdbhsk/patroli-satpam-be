import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { LoginDto } from './dto/login.dto';
import { AuthEntity } from './entities/auth.entity';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() { email, password }: LoginDto) {
    Logger.log('Login request received', `${email} ${password}`);
    return this.authService.login(email, password);
  }
}
