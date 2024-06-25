import { Module } from '@nestjs/common';
import { RoomReportsService } from './rooms.service';
import { RoomReportsController } from './rooms.controller';
import { PrismaModule } from 'nestjs-prisma';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  controllers: [RoomReportsController],
  providers: [RoomReportsService],
  imports: [PrismaModule, CloudinaryModule],
})
export class RoomReportsModule {}
