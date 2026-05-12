import { Module } from '@nestjs/common';
import { PlanMantenimientoController } from './plan-mantenimiento.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PlanMantenimientoController],
})
export class PlanMantenimientoModule {}
