import {
  Controller,
  Get,
  UseGuards,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GeneralService } from './general.service';

@ApiTags('General')
@Controller('general')
export class GeneralController {
  constructor(private readonly generalService: GeneralService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getStatistics(@Query('date') date?: string) {
    try {
      let parsedDate: Date;

      if (date) {
        parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
          throw new BadRequestException('Invalid date format');
        }
      } else {
        parsedDate = new Date();
        parsedDate.setHours(0, 0, 0, 0); // Set to the start of today
      }

      return this.generalService.getStat(parsedDate);
    } catch (error) {
      throw new BadRequestException(
        'An error occurred while fetching statistics',
      );
    }
  }
}
