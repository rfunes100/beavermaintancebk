import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, UsePipes } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CreateContratistaDto, UpdateContratistaDto } from './dto/contratista.dto';
import { ValidationPipe } from '../common/validation.pipe';

@ApiTags('Contratistas')
@Controller('contratistas')
export class ContratistasController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los contratistas' })
  findAll() {
    return this.prisma.contratista.findMany({
      include: { equipos: true, ubicaciones: true },
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un contratista por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.prisma.contratista.findUnique({
      where: { id },
      include: { equipos: true, ubicaciones: true },
    });
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo contratista' })
  @ApiBody({ type: CreateContratistaDto })
  @UsePipes(ValidationPipe)
  create(@Body() data: CreateContratistaDto) {
    return this.prisma.contratista.create({ data });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un contratista' })
  @ApiBody({ type: UpdateContratistaDto })
  @UsePipes(ValidationPipe)
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateContratistaDto) {
    return this.prisma.contratista.update({ where: { id }, data });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un contratista' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.prisma.contratista.delete({ where: { id } });
  }
}
