import { Module } from '@nestjs/common';
import { AssetReportsService } from './assets.service';
import { AssetReportsController } from './assets.controller';
import { PrismaModule } from 'nestjs-prisma';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  controllers: [AssetReportsController],
  providers: [AssetReportsService],
  imports: [PrismaModule, CloudinaryModule],
})
export class AssetReportsModule {}
