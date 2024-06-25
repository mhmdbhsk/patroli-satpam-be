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
import { CreateReportBuildingDto } from './dto/create-report-building.dto';
import { UpdateReportBuildingDto } from './dto/update-report-building.dto';
import { ApiConsumes, ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { BuildingReportsService } from './buildings.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Reports Building')
@Controller('reports/building')
export class BuildingReportsController {
  constructor(
    private readonly buildingReportsService: BuildingReportsService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateReportBuildingDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(
    @Body() createReportBuildingDto: CreateReportBuildingDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    createReportBuildingDto.image = image;
    return this.buildingReportsService.create(createReportBuildingDto);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateReportBuildingDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() updateReportBuildingDto: UpdateReportBuildingDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    updateReportBuildingDto.image = image;
    return this.buildingReportsService.update(id, updateReportBuildingDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll() {
    return this.buildingReportsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.buildingReportsService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.buildingReportsService.remove(id);
  }
}
