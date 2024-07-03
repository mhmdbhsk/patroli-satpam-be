import { Injectable } from '@nestjs/common';
import { CreateReportRoomDto } from './dto/create-report-room.dto';
import { UpdateReportRoomDto } from './dto/update-report-room.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class RoomReportsService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async create(createReportRoomDto: CreateReportRoomDto) {
    if (createReportRoomDto.image) {
      const cloudinaryResponse = await this.cloudinary.uploadImage(
        createReportRoomDto.image,
      );
      createReportRoomDto.image = cloudinaryResponse.secure_url;
    }

    return this.prisma.reportRoom.create({
      data: createReportRoomDto,
    });
  }

  async update(id: string, updateReportRoomDto: UpdateReportRoomDto) {
    if (updateReportRoomDto.image) {
      const cloudinaryResponse = await this.cloudinary.uploadImage(
        updateReportRoomDto.image,
      );
      updateReportRoomDto.image = cloudinaryResponse.secure_url;
    }

    return this.prisma.reportRoom.update({
      where: { id },
      data: updateReportRoomDto,
    });
  }

  findAll() {
    return this.prisma.reportRoom.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.reportRoom.findUnique({
      where: { id },
    });
  }

  remove(id: string) {
    return this.prisma.reportRoom.delete({
      where: { id },
    });
  }
}
