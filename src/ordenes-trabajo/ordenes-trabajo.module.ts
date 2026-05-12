import { Module } from '@nestjs/common';
import { OrdenesTrabajoController } from './ordenes-trabajo.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OrdenesTrabajoController],
})
export class OrdenesTrabajoModule {}
