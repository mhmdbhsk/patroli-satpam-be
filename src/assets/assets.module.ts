import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { PrismaModule } from 'nestjs-prisma';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  controllers: [AssetsController],
  providers: [AssetsService],
  imports: [PrismaModule, CloudinaryModule],
})
export class AssetsModule {}
