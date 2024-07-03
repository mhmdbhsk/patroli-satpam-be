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
    Logger.log(`Allowed Radius: ${allowedRadius.value}`);

    if (distance > Number(allowedRadius.value)) {
      throw new BadRequestException(
        `Report location is outside the allowed radius of ${allowedRadius.value} km`,
      );
    }

    // Check if user already made a report today for the same building
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const existingReport = await this.prisma.reportBuilding.findFirst({
      where: {
        buildingId: createReportBuildingDto.buildingId,
        createdAt: {
          gte: today,
          lte: endOfDay,
        },
      },
    });

    if (existingReport) {
      throw new BadRequestException(
        `You have already made a report for this building today.`,
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
        user: true,
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
        user: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.reportBuilding.findUnique({
      where: { id },
      include: {
        building: true,
        user: true,
      },
    });
  }

  remove(id: string) {
    return this.prisma.reportBuilding.delete({
      where: { id },
    });
  }
}
