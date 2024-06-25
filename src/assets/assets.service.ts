import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class AssetsService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async create(createAssetDto: CreateAssetDto) {
    if (createAssetDto.image) {
      const cloudinaryResponse = await this.cloudinary.uploadImage(
        createAssetDto.image,
      );
      createAssetDto.image = cloudinaryResponse.secure_url;
    }

    return this.prisma.asset.create({
      data: createAssetDto,
    });
  }

  async update(id: string, updateAssetDto: UpdateAssetDto) {
    if (updateAssetDto.image) {
      const cloudinaryResponse = await this.cloudinary.uploadImage(
        updateAssetDto.image,
      );
      updateAssetDto.image = cloudinaryResponse.secure_url;
    }

    return this.prisma.asset.update({
      where: { id },
      data: updateAssetDto,
    });
  }

  findAll() {
    return this.prisma.asset.findMany();
  }

  findOne(id: string) {
    return this.prisma.asset.findUnique({
      where: { id },
    });
  }

  remove(id: string) {
    return this.prisma.asset.delete({
      where: { id },
    });
  }
}
