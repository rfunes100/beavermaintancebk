import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, UsePipes } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CreateCategoriaDto, UpdateCategoriaDto } from './dto/categoria.dto';
import { ValidationPipe } from '../common/validation.pipe';

@ApiTags('Categorias')
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las categorías' })
  findAll() {
    return this.prisma.categoria.findMany({
      include: { equipos: true },
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.prisma.categoria.findUnique({
      where: { id },
      include: { equipos: true },
    });
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoría' })
  @ApiBody({ type: CreateCategoriaDto })
  @UsePipes(ValidationPipe)
  create(@Body() data: CreateCategoriaDto) {
    return this.prisma.categoria.create({ data });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una categoría' })
  @ApiBody({ type: UpdateCategoriaDto })
  @UsePipes(ValidationPipe)
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateCategoriaDto) {
    return this.prisma.categoria.update({
      where: { id },
      data,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una categoría' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.prisma.categoria.delete({
      where: { id },
    });
  }
}
