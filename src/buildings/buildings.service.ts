import { Injectable } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class BuildingsService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async create(createBuildingDto: CreateBuildingDto) {
    if (createBuildingDto.image) {
      const cloudinaryResponse = await this.cloudinary.uploadImage(
        createBuildingDto.image,
      );
      createBuildingDto.image = cloudinaryResponse.secure_url;
    }

    return this.prisma.building.create({
      data: createBuildingDto,
    });
  }

  async update(id: string, updateBuildingDto: UpdateBuildingDto) {
    if (updateBuildingDto.image) {
      const cloudinaryResponse = await this.cloudinary.uploadImage(
        updateBuildingDto.image,
      );
      updateBuildingDto.image = cloudinaryResponse.secure_url;
    }

    return this.prisma.building.update({
      where: { id },
      data: updateBuildingDto,
    });
  }

  findAll() {
    return this.prisma.building.findMany();
  }

  findOne(id: string) {
    return this.prisma.building.findUnique({
      where: { id },
    });
  }

  remove(id: string) {
    return this.prisma.building.delete({
      where: { id },
    });
  }
}
