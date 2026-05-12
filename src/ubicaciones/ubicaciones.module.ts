import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UbicacionesController } from './ubicaciones.controller';
import { SharePointModule } from '../SharePoint/sharePoint.module';

@Module({
  imports: [PrismaModule, SharePointModule],
  controllers: [UbicacionesController],
})
export class UbicacionesModule {}
