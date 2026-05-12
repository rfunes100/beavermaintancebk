import { Module } from '@nestjs/common';
import { ActividadesController } from './actividades.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ActividadesController],
})
export class ActividadesModule {}
