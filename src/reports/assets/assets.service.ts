import { Injectable } from '@nestjs/common';
import { CreateReportAssetDto } from './dto/create-report-asset.dto';
import { UpdateReportAssetDto } from './dto/update-report-asset.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class AssetReportsService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async create(createReportAssetDto: CreateReportAssetDto) {
    if (createReportAssetDto.image) {
      const cloudinaryResponse = await this.cloudinary.uploadImage(
        createReportAssetDto.image,
      );
      createReportAssetDto.image = cloudinaryResponse.secure_url;
    }

    return this.prisma.reportAsset.create({
      data: createReportAssetDto,
    });
  }

  async update(id: string, updateReportAssetDto: UpdateReportAssetDto) {
    if (updateReportAssetDto.image) {
      const cloudinaryResponse = await this.cloudinary.uploadImage(
        updateReportAssetDto.image,
      );
      updateReportAssetDto.image = cloudinaryResponse.secure_url;
    }

    return this.prisma.reportAsset.update({
      where: { id },
      data: updateReportAssetDto,
    });
  }

  findAll() {
    return this.prisma.reportAsset.findMany({
      include: {
        user: true,
        asset: {
          include: {
            room: true,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.reportAsset.findUnique({
      where: { id },
    });
  }

  remove(id: string) {
    return this.prisma.reportAsset.delete({
      where: { id },
    });
  }
}
