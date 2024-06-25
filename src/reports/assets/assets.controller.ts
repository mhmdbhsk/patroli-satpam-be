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
import { CreateReportAssetDto } from './dto/create-report-asset.dto';
import { UpdateReportAssetDto } from './dto/update-report-asset.dto';
import { ApiConsumes, ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AssetReportsService } from './assets.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Reports Asset')
@Controller('reports/asset')
export class AssetReportsController {
  constructor(private readonly assetReportService: AssetReportsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateReportAssetDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(
    @Body() createReportAssetDto: CreateReportAssetDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    createReportAssetDto.image = image;
    return this.assetReportService.create(createReportAssetDto);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateReportAssetDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() updateReportAssetDto: UpdateReportAssetDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    updateReportAssetDto.image = image;
    return this.assetReportService.update(id, updateReportAssetDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll() {
    return this.assetReportService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.assetReportService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.assetReportService.remove(id);
  }
}
