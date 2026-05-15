import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDepartamentoDto, UpdateDepartamentoDto } from './dto/create-departamento.dto';
import { ValidationPipe } from '../common/validation.pipe';

@ApiTags('Departamentos')
@Controller('departamentos')
export class DepartamentosController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los departamentos' })
  findAll() {
    return this.prisma.departamento.findMany({
      include: { equipos: true, usuarios: true },
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un departamento por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.prisma.departamento.findUnique({
      where: { id },
      include: { equipos: true, usuarios: true },
    });
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo departamento' })
  @ApiBody({ type: CreateDepartamentoDto })
  @UsePipes(ValidationPipe)
  create(@Body() data: CreateDepartamentoDto) {
    return this.prisma.departamento.create({ data });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un departamento' })
  @ApiBody({ type: UpdateDepartamentoDto })
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() data: UpdateDepartamentoDto
  ) { 
    return this.prisma.departamento.update({ where: { id }, data });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un departamento' })
   remove(@Param('id') id: string) {
    return this.prisma.departamento.delete({ 
      where: { id: Number(id) } 
    });
    }
    
}
