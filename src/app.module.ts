import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BuildingsModule } from './buildings/buildings.module';
import { RoomsModule } from './rooms/rooms.module';
import { AssetsModule } from './assets/assets.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { PrismaModule } from 'nestjs-prisma';
import { BuildingReportsModule } from './reports/buildings/buildings.module';
import { RoomReportsModule } from './reports/rooms/rooms.module';
import { AssetReportsModule } from './reports/assets/assets.module';
import { SettingsModule } from './settings/settings.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    PrismaModule.forRoot({
      prismaServiceOptions: {
        prismaOptions: {
          log: [
            {
              emit: 'event',
              level: 'query',
            },
          ],
        },
      },
    }),
    UsersModule,
    BuildingsModule,
    RoomsModule,
    AssetsModule,
    CloudinaryModule,
    SettingsModule,
    BuildingReportsModule,
    RoomReportsModule,
    AssetReportsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
