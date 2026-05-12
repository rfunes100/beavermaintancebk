import { Module } from '@nestjs/common';
import { CategoriasController } from './categoria.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CategoriasController],
})
export class CategoriasModule {}
