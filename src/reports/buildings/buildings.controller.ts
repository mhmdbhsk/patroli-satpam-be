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
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateReportBuildingDto } from './dto/create-report-building.dto';
import { UpdateReportBuildingDto } from './dto/update-report-building.dto';
import { ApiConsumes, ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { BuildingReportsService } from './buildings.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';

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
  async create(
    @Body() createReportBuildingDto: CreateReportBuildingDto,
    @UploadedFile() image: Express.Multer.File,
    @Req() req: Request,
  ) {
    try {
      createReportBuildingDto.image = image;

      return this.buildingReportsService.create(
        createReportBuildingDto,
        (req.user as any).id,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message);
      } else {
        throw new BadRequestException(
          'An error occurred during report building creation',
        );
      }
    }
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateReportBuildingDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateReportBuildingDto: UpdateReportBuildingDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    try {
      updateReportBuildingDto.image = image;
      return this.buildingReportsService.update(id, updateReportBuildingDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message);
      } else {
        throw new BadRequestException(
          'An error occurred during report building update',
        );
      }
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findAll() {
    try {
      return this.buildingReportsService.findAll();
    } catch (error) {
      throw new BadRequestException(
        'An error occurred while fetching report buildings',
      );
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    try {
      return this.buildingReportsService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new BadRequestException(
          'An error occurred while fetching the report building',
        );
      }
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    try {
      return this.buildingReportsService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message);
      } else {
        throw new BadRequestException(
          'An error occurred while deleting the report building',
        );
      }
    }
  }
}
