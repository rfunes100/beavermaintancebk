import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ContratistasController } from './contratistas.controller';


@Module({
  imports: [PrismaModule],
  controllers: [ContratistasController],
})
export class ContratistasModule {}
