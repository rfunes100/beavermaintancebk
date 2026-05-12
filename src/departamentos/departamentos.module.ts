import { Module } from '@nestjs/common';
import { DepartamentosController } from './departamentos.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DepartamentosController],
})
export class DepartamentosModule {}
