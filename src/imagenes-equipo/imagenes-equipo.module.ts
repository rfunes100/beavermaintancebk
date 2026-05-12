import { Module } from '@nestjs/common';
import { ImagenesEquipoController } from './imagenes-equipo.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ImagenesEquipoController],
})
export class ImagenesEquipoModule {}
