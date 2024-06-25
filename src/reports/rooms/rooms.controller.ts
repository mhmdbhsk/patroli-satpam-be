import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Get,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreateReportRoomDto } from './dto/create-report-room.dto';
import { UpdateReportRoomDto } from './dto/update-report-room.dto';
import { ApiConsumes, ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RoomReportsService } from './rooms.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Reports Room')
@Controller('reports/room')
export class RoomReportsController {
  constructor(private readonly roomReportService: RoomReportsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateReportRoomDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(
    @Body() createReportRoomDto: CreateReportRoomDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    createReportRoomDto.image = image;
    return this.roomReportService.create(createReportRoomDto);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateReportRoomDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() updateReportRoomDto: UpdateReportRoomDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    updateReportRoomDto.image = image;
    return this.roomReportService.update(id, updateReportRoomDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll() {
    return this.roomReportService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.roomReportService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.roomReportService.remove(id);
  }
}
