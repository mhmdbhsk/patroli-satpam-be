import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { CreateReportBuildingDto } from './dto/create-report-building.dto';
import { UpdateReportBuildingDto } from './dto/update-report-building.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'nestjs-prisma';
import { haversine } from 'src/utils/haversine';

@Injectable()
export class BuildingReportsService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async create(
    createReportBuildingDto: CreateReportBuildingDto,
    userId: string,
  ) {
    const building = await this.prisma.building.findUnique({
      where: { id: createReportBuildingDto.buildingId },
    });
    const allowedRadius = await this.prisma.setting.findFirst({
      where: { name: 'Radius Patroli' },
      select: { value: true },
    });

    if (!allowedRadius) {
      throw new BadRequestException('Allowed radius setting not found');
    }

    if (!building) {
      throw new BadRequestException('Building not found');
    }

    const reportLat = parseFloat(createReportBuildingDto.latitude);
    const reportLon = parseFloat(createReportBuildingDto.longitude);
    const buildingLat = parseFloat(building.latitude);
    const buildingLon = parseFloat(building.longitude);

    const distance = haversine(reportLat, reportLon, buildingLat, buildingLon);

    Logger.log(`Distance: ${distance}`);
    Logger.log(`Distance: ${allowedRadius.value}`);

    if (distance > Number(allowedRadius.value)) {
      throw new BadRequestException(
        `Report location is outside the allowed radius of ${allowedRadius.value} km`,
      );
    }

    if (createReportBuildingDto.image) {
      const cloudinaryResponse = await this.cloudinary.uploadImage(
        createReportBuildingDto.image,
      );
      createReportBuildingDto.image = cloudinaryResponse.secure_url;
    }

    return this.prisma.reportBuilding.create({
      data: { ...createReportBuildingDto, userId: userId },
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
    return this.prisma.reportBuilding.findMany({
      include: {
        building: true,
      },
    });
  }

  findAllByUser(userId: string) {
    return this.prisma.reportBuilding.findMany({
      orderBy: { createdAt: 'desc' },
      where: {
        userId: userId,
      },
      include: {
        building: true,
      },
    });
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
