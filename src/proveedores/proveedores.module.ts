import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ProveedoresController } from './proveedores.controller';


@Module({
  imports: [PrismaModule],
  controllers: [ProveedoresController],
})
export class ProveedoresModule {}
