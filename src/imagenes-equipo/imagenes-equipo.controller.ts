import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, UsePipes } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CreateImagenEquipoDto, UpdateImagenEquipoDto } from './dto/imagen-equipo.dto';
import { ValidationPipe } from '../common/validation.pipe';

@ApiTags('Imágenes de Equipos')
@Controller('imagenes-equipo')
export class ImagenesEquipoController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las imágenes' })
  findAll() {
    return this.prisma.imagenEquipo.findMany({ include: { equipo: true } });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una imagen por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.prisma.imagenEquipo.findUnique({
      where: { id },
      include: { equipo: true },
    });
  }

  @Post()
  @ApiOperation({ summary: 'Subir/Registrar una nueva imagen' })
  @ApiBody({ type: CreateImagenEquipoDto })
  @UsePipes(ValidationPipe)
  create(@Body() data: CreateImagenEquipoDto) {
    return this.prisma.imagenEquipo.create({ data });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar información de una imagen' })
  @ApiBody({ type: UpdateImagenEquipoDto })
  @UsePipes(ValidationPipe)
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateImagenEquipoDto) {
    return this.prisma.imagenEquipo.update({ where: { id }, data });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una imagen' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.prisma.imagenEquipo.delete({ where: { id } });
  }
}
