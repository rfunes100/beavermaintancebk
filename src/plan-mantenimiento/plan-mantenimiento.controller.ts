import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, UsePipes } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CreatePlanMantenimientoDto, UpdatePlanMantenimientoDto } from './dto/plan-mantenimiento.dto';
import { ValidationPipe } from '../common/validation.pipe';

@ApiTags('Planes de Mantenimiento')
@Controller('plan-mantenimiento')
export class PlanMantenimientoController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los planes de mantenimiento' })
  findAll() {
    return this.prisma.planMantenimiento.findMany({ include: { equipo: true } });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un plan de mantenimiento por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.prisma.planMantenimiento.findUnique({
      where: { id },
      include: { equipo: true },
    });
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo plan de mantenimiento' })
  @ApiBody({ type: CreatePlanMantenimientoDto })
  @UsePipes(ValidationPipe)
  create(@Body() data: CreatePlanMantenimientoDto) {
    return this.prisma.planMantenimiento.create({ data });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un plan de mantenimiento' })
  @ApiBody({ type: UpdatePlanMantenimientoDto })
  @UsePipes(ValidationPipe)
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdatePlanMantenimientoDto) {
    return this.prisma.planMantenimiento.update({ where: { id }, data });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un plan de mantenimiento' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.prisma.planMantenimiento.delete({ where: { id } });
  }
}
