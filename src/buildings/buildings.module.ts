import { Module } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { BuildingsController } from './buildings.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  controllers: [BuildingsController],
  providers: [BuildingsService],
  imports: [CloudinaryModule, PrismaModule],
})
export class BuildingsModule {}
