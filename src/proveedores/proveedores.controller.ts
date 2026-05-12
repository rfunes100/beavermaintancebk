import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, UsePipes } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CreateProveedorDto, UpdateProveedorDto } from './dto/proveedor.dto';
import { ValidationPipe } from '../common/validation.pipe';

@ApiTags('Proveedores')
@Controller('proveedores')
export class ProveedoresController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los proveedores' })
  findAll() {
    return this.prisma.proveedor.findMany({
      include: { equipos: true, ubicaciones: true },
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un proveedor por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.prisma.proveedor.findUnique({
      where: { id },
      include: { equipos: true, ubicaciones: true },
    });
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo proveedor' })
  @ApiBody({ type: CreateProveedorDto })
  @UsePipes(ValidationPipe)
  create(@Body() data: CreateProveedorDto) {
    return this.prisma.proveedor.create({ data });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un proveedor' })
  @ApiBody({ type: UpdateProveedorDto })
  @UsePipes(ValidationPipe)
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateProveedorDto) {
    return this.prisma.proveedor.update({ where: { id }, data });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un proveedor' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.prisma.proveedor.delete({ where: { id } });
  }
}
