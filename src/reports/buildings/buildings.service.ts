import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateReportBuildingDto } from './dto/create-report-building.dto';
import { UpdateReportBuildingDto } from './dto/update-report-building.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'nestjs-prisma';
import { haversine } from 'src/utils/haversine';

@Injectable()
export class BuildingReportsService {
  private readonly allowedRadius = 5;

  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async create(createReportBuildingDto: CreateReportBuildingDto) {
    const building = await this.prisma.building.findUnique({
      where: { id: createReportBuildingDto.buildingId },
    });

    if (!building) {
      throw new BadRequestException('Building not found');
    }

    const reportLat = parseFloat(createReportBuildingDto.latitude);
    const reportLon = parseFloat(createReportBuildingDto.longitude);
    const buildingLat = parseFloat(building.latitude);
    const buildingLon = parseFloat(building.longitude);

    const distance = haversine(reportLat, reportLon, buildingLat, buildingLon);

    if (distance > this.allowedRadius) {
      throw new BadRequestException(
        `Report location is outside the allowed radius of ${this.allowedRadius} km`,
      );
    }

    if (createReportBuildingDto.image) {
      const cloudinaryResponse = await this.cloudinary.uploadImage(
        createReportBuildingDto.image,
      );
      createReportBuildingDto.image = cloudinaryResponse.secure_url;
    }

    return this.prisma.reportBuilding.create({
      data: createReportBuildingDto,
    });
  }

  async update(id: string, updateReportBuildingDto: UpdateReportBuildingDto) {
    if (updateReportBuildingDto.image) {
      const cloudinaryResponse = await this.cloudinary.uploadImage(
        updateReportBuildingDto.image,
      );
      updateReportBuildingDto.image = cloudinaryResponse.secure_url;
    }

    return this.prisma.reportBuilding.update({
      where: { id },
      data: updateReportBuildingDto,
    });
  }

  findAll() {
    return this.prisma.reportBuilding.findMany();
  }

  findOne(id: string) {
    return this.prisma.reportBuilding.findUnique({
      where: { id },
    });
  }

  remove(id: string) {
    return this.prisma.reportBuilding.delete({
      where: { id },
    });
  }
}
