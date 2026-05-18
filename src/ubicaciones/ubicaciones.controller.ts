import 'multer';
import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, UsePipes, UploadedFile, UseInterceptors, BadRequestException, Req } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiTags, ApiOperation, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { CreateUbicacionDto, UpdateUbicacionDto } from './dto/ubicacion.dto';
import { ValidationPipe } from '../common/validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { SharePointService } from '../sharepoint/sharepoint.service';


@ApiTags('Ubicaciones')
@Controller('ubicaciones')
export class UbicacionesController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sharepointService: SharePointService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las ubicaciones' })
  findAll() {
    return this.prisma.ubicacion.findMany({
      include: {
        equipos: true,
        usuarios: true,
        proveedores: true,
        contratistas: true,
        childUbicaciones: true,
        parentUbicacion: true,
      },
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una ubicación por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.prisma.ubicacion.findUnique({
      where: { id },
      include: {
        equipos: true,
        usuarios: true,
        proveedores: true,
        contratistas: true,
        childUbicaciones: true,
        parentUbicacion: true,
      },
    });
  }

  
@Post()
  @ApiOperation({ summary: 'Crear una nueva ubicación' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateUbicacionDto })
  @UseInterceptors(FileInterceptor('imagen'))
  async create(
    // 🔥 APLICAMOS EL TRUCO: Escondemos el archivo del ValidationPipe
    @Req() req: any,
    @Body() data: CreateUbicacionDto
  ) {
    // Extraemos la imagen manualmente del request
    const file = req.file;

    try {
      console.log('--- Iniciando creación de ubicación ---');
      let finalImagenUrl = undefined;

      if (file) {
        console.log('1. Archivo detectado. Preparando subida a SharePoint...');
        const year = new Date().getFullYear().toString();
        // Usamos el ID temporal o fecha para la carpeta
        const codigo = `UBC-${Date.now()}`;
        const categoria = 'Ubicaciones';

        console.log(`2. Llamando a SharePointService para subir archivo: ${file.originalname}`);
        const sharePointResult = await this.sharepointService.uploadToMantenimiento(
          file,
          { year, codigo, categoria }
        );

        console.log('3. SharePoint respondió con éxito:', sharePointResult.webUrl);
        finalImagenUrl = sharePointResult.webUrl;
      }

      console.log('4. Preparando datos para Prisma...');
      // Extraemos campos que NO pertenecen al modelo de Prisma
      // Nota: 'imagen' en 'data' vendrá vacío gracias a la separación, pero lo destapamos por seguridad
      const { imagen, imagenUrl, ...restOfData } = data;

      const prismaData = {
        ...restOfData,
        imagenUrl: finalImagenUrl || imagenUrl || null,
      };

      console.log('5. Ejecutando prisma.ubicacion.create...');
      // El "as any" se puede quitar si el DTO y el esquema coinciden perfectamente
      const result = await this.prisma.ubicacion.create({ data: prismaData as any });
      console.log('6. Ubicación creada exitosamente en la base de datos.');
      
      return result;
    } catch (error: any) {
      console.error('--- ERROR DETECTADO ---');
      console.error('Mensaje:', error?.message || error);
      if (error?.response) console.error('Detalles del error (API):', error.response?.data);
      throw new BadRequestException(`No se pudo guardar la ubicación: ${error?.message || error}`);
    }
  }


  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una ubicación' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('imagen'))
  @ApiBody({ type: UpdateUbicacionDto })
  @UsePipes(ValidationPipe)
  async update(
  @Param('id', ParseIntPipe) id: number,
  @Req() req: any,
  @Body() data: UpdateUbicacionDto
) {
  const file = req.file; // Extraemos la nueva imagen si existe
  let finalImagenUrl = undefined;

  try {
    // 1. Si el técnico subió una nueva foto/documento, lo mandamos a SharePoint
    if (file) {
      const year = new Date().getFullYear().toString();
      const codigo = `UBC-EDIT-${id}`;
      const categoria = 'Ubicaciones';

      const sharePointResult = await this.sharepointService.uploadToMantenimiento(
        file,
        { year, codigo, categoria }
      );
      finalImagenUrl = sharePointResult.webUrl;
    }

    // 2. Quitamos campos basura que no van a Prisma
    const { imagen, imagenUrl, ...restOfData } = data as any;

    // 3. Preparamos el objeto final para la base de datos
    const prismaData = {
      ...restOfData,
      // Solo actualizamos la URL si realmente se subió un archivo nuevo
      ...(finalImagenUrl && { imagenUrl: finalImagenUrl }),
    };

    // 4. Ahora Prisma sí recibirá los datos correctos
    return await this.prisma.ubicacion.update({
      where: { id },
      data: prismaData,
    });
  } catch (error: any) {
    throw new BadRequestException(`Fallo al actualizar: ${error.message}`);
  }
}


  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una ubicación' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.prisma.ubicacion.delete({ where: { id } });
  }
}
