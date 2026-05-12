import { Controller, Get, Post, Body, Param, Delete, Put, UsePipes, ParseIntPipe } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEquipoDto, UpdateEquipoDto } from './dto/equipo.dto';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { ValidationPipe } from '../common/validation.pipe';

@ApiTags('Equipos')
@Controller('equipos')
export class EquiposController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los equipos' })
  findAll() {
    return this.prisma.equipo.findMany({
      include: {
        departamento: true,
        categoria: true,
        ubicacion: true,
        planes: true,
        solicitudes: true,
        ordenesTrabajo: true,
        imagenes: true,
        trabajadorPrincipal: true,
        contratista: true,
        proveedor: true,
        equipoPadre: true,
        subEquipos: true,
      },
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un equipo por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.prisma.equipo.findUnique({
      where: { id },
      include: {
        departamento: true,
        categoria: true,
        ubicacion: true,
        planes: true,
        solicitudes: true,
        ordenesTrabajo: true,
        imagenes: true,
        trabajadorPrincipal: true,
        contratista: true,
        proveedor: true,
        equipoPadre: true,
        subEquipos: true,
      },
    });
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo equipo' })
  @ApiBody({ type: CreateEquipoDto })
  @UsePipes(ValidationPipe)
  create(@Body() data: CreateEquipoDto) {
    return this.prisma.equipo.create({
      data: data as any,
    });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un equipo' })
  @ApiBody({ type: UpdateEquipoDto })
  @UsePipes(ValidationPipe)
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateEquipoDto) {
    return this.prisma.equipo.update({
      where: { id },
      data: data as any,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un equipo' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.prisma.equipo.delete({
      where: { id },
    });
  }
}
