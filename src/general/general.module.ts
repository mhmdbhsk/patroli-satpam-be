import { Module } from '@nestjs/common';
import { GeneralService } from './general.service';
import { GeneralController } from './general.controller';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  controllers: [GeneralController],
  providers: [GeneralService],
  imports: [PrismaModule],
})
export class GeneralModule {}
