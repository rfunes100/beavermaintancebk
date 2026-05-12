import { Module } from '@nestjs/common';
import { SolicitudesController } from './solicitudes.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SolicitudesController],
})
export class SolicitudesModule {}
