import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, UsePipes } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto/usuario.dto';
import { ValidationPipe } from '../common/validation.pipe';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  findAll() {
    return this.prisma.usuario.findMany({ 
      include: { 
        departamento: true, 
        solicitudes: true, 
        ordenesAsignadas: true,
        equiposPrincipales: true,
        equiposAdicionales: true,
        ubicaciones: true,
      } 
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.prisma.usuario.findUnique({
      where: { id },
      include: { 
        departamento: true, 
        solicitudes: true, 
        ordenesAsignadas: true,
        equiposPrincipales: true,
        equiposAdicionales: true,
        ubicaciones: true,
      },
    });
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiBody({ type: CreateUsuarioDto })
  @UsePipes(ValidationPipe)
  create(@Body() data: CreateUsuarioDto) {
    return this.prisma.usuario.create({ data });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un usuario' })
  @ApiBody({ type: UpdateUsuarioDto })
  @UsePipes(ValidationPipe)
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateUsuarioDto) {
    return this.prisma.usuario.update({ where: { id }, data });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.prisma.usuario.delete({ where: { id } });
  }
}
