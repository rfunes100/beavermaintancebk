import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('ordenes-trabajo')
export class OrdenesTrabajoController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  findAll() {
    return this.prisma.ordenTrabajo.findMany({
      include: {
        equipo: true,
        responsable: { include: { departamento: true } },
        solicitud: true,
        actividades: true,
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prisma.ordenTrabajo.findUnique({
      where: { id },
      include: {
        equipo: true,
        responsable: { include: { departamento: true } },
        solicitud: true,
        actividades: true,
      },
    });
  }

  @Post()
  create(@Body() data: any) {
    return this.prisma.ordenTrabajo.create({ data });
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.prisma.ordenTrabajo.update({ where: { id }, data });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.prisma.ordenTrabajo.delete({ where: { id } });
  }
}
