import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, UsePipes } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CreateSolicitudDto, UpdateSolicitudDto } from './dto/solicitud.dto';
import { ValidationPipe } from '../common/validation.pipe';

@ApiTags('Solicitudes')
@Controller('solicitudes')
export class SolicitudesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las solicitudes de mantenimiento' })
  findAll() {
    return this.prisma.solicitudMantenimiento.findMany({
      include: {
        equipo: true,
        solicitante: { include: { departamento: true } },
        ordenTrabajo: true,
      },
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una solicitud por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.prisma.solicitudMantenimiento.findUnique({
      where: { id },
      include: {
        equipo: true,
        solicitante: { include: { departamento: true } },
        ordenTrabajo: true,
      },
    });
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva solicitud' })
  @ApiBody({ type: CreateSolicitudDto })
  @UsePipes(ValidationPipe)
  create(@Body() data: CreateSolicitudDto) {
    return this.prisma.solicitudMantenimiento.create({ data });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una solicitud' })
  @ApiBody({ type: UpdateSolicitudDto })
  @UsePipes(ValidationPipe)
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateSolicitudDto) {
    return this.prisma.solicitudMantenimiento.update({ where: { id }, data });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una solicitud' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.prisma.solicitudMantenimiento.delete({ where: { id } });
  }
}
