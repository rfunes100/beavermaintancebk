import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, UsePipes } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CreateOrdenTrabajoDto, UpdateOrdenTrabajoDto } from './dto/orden-trabajo.dto';
import { ValidationPipe } from '../common/validation.pipe';

@ApiTags('Ordenes de Trabajo')
@Controller('ordenes-trabajo')
export class OrdenesTrabajoController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las órdenes de trabajo' })
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
  @ApiOperation({ summary: 'Obtener una orden de trabajo por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
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
  @ApiOperation({ summary: 'Crear una nueva orden de trabajo' })
  @ApiBody({ type: CreateOrdenTrabajoDto })
  @UsePipes(ValidationPipe)
  create(@Body() data: CreateOrdenTrabajoDto) {
    return this.prisma.ordenTrabajo.create({ data });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una orden de trabajo' })
  @ApiBody({ type: UpdateOrdenTrabajoDto })
  @UsePipes(ValidationPipe)
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateOrdenTrabajoDto) {
    return this.prisma.ordenTrabajo.update({ where: { id }, data });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una orden de trabajo' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.prisma.ordenTrabajo.delete({ where: { id } });
  }
}
