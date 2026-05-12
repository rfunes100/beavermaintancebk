import { Module } from '@nestjs/common';
import { EquiposController } from './equipos.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EquiposController],
})
export class EquiposModule {}
