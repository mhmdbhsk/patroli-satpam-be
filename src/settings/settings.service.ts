import { Injectable } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async create(createSettingDto: CreateSettingDto) {
    return this.prisma.setting.create({
      data: createSettingDto,
    });
  }

  async update(id: string, updateSettingDto: UpdateSettingDto) {
    return this.prisma.setting.update({
      where: { id },
      data: updateSettingDto,
    });
  }

  findAll() {
    return this.prisma.setting.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.setting.findUnique({
      where: { id },
    });
  }

  remove(id: string) {
    return this.prisma.setting.delete({
      where: { id },
    });
  }
}
