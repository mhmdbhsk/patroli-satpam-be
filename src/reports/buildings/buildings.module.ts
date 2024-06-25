import { Module } from '@nestjs/common';
import { BuildingReportsService } from './buildings.service';
import { PrismaModule } from 'nestjs-prisma';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { BuildingReportsController } from './buildings.controller';

@Module({
  controllers: [BuildingReportsController],
  providers: [BuildingReportsService],
  imports: [PrismaModule, CloudinaryModule],
})
export class BuildingReportsModule {}
