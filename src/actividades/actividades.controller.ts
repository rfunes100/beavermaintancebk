import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, UsePipes } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CreateActividadDto, UpdateActividadDto } from './dto/actividad.dto';
import { ValidationPipe } from '../common/validation.pipe';

@ApiTags('Actividades de OT')
@Controller('actividades')
export class ActividadesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las actividades' })
  findAll() {
    return this.prisma.actividadOT.findMany({ include: { ordenTrabajo: true } });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una actividad por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.prisma.actividadOT.findUnique({
      where: { id },
      include: { ordenTrabajo: true },
    });
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva actividad' })
  @ApiBody({ type: CreateActividadDto })
  @UsePipes(ValidationPipe)
  create(@Body() data: CreateActividadDto) {
    return this.prisma.actividadOT.create({ data });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una actividad' })
  @ApiBody({ type: UpdateActividadDto })
  @UsePipes(ValidationPipe)
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateActividadDto) {
    return this.prisma.actividadOT.update({ where: { id }, data });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una actividad' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.prisma.actividadOT.delete({ where: { id } });
  }
}
