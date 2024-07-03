import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class GeneralService {
  constructor(private prisma: PrismaService) {}

  async getStat(date: Date) {
    const totalBuildings = await this.prisma.building.count();
    const totalRooms = await this.prisma.room.count();

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const buildingsCheckedToday = await this.prisma.reportBuilding.count({
      where: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    const buildingsNotCheckedToday = totalBuildings - buildingsCheckedToday;

    return {
      totalBuildings,
      totalRooms,
      buildingsCheckedToday,
      buildingsNotCheckedToday,
    };
  }
}
