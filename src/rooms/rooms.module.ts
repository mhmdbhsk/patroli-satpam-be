import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
  imports: [CloudinaryModule, PrismaModule],
})
export class RoomsModule {}
