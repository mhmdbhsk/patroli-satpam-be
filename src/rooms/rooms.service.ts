import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class RoomsService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async create(createRoomDto: CreateRoomDto) {
    if (createRoomDto.image) {
      const cloudinaryResponse = await this.cloudinary.uploadImage(
        createRoomDto.image,
      );
      createRoomDto.image = cloudinaryResponse.secure_url;
    }

    return this.prisma.room.create({
      data: createRoomDto,
    });
  }

  findAll() {
    return this.prisma.room.findMany({
      include: {
        building: true,
        assets: true,
        reports: true,
        _count: {
          select: {
            reports: true,
            assets: true,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.room.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    if (updateRoomDto.image) {
      const cloudinaryResponse = await this.cloudinary.uploadImage(
        updateRoomDto.image,
      );
      updateRoomDto.image = cloudinaryResponse.secure_url;
    }

    return this.prisma.room.update({
      where: { id },
      data: updateRoomDto,
    });
  }

  remove(id: string) {
    return this.prisma.room.delete({
      where: { id },
    });
  }
}
