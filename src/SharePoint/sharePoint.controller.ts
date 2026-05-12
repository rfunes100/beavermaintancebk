import { BadRequestException, Body, Req, Controller, Get, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { FileUploadDto } from './dto/file-upload.dto';
import { Response } from 'express';
import { SharePointService } from './SharePoint.service';

import { IsString, IsNotEmpty } from 'class-validator';

export class UploadPruebaDto {
  @ApiProperty({ example: '2026' })
  @IsString()
  @IsNotEmpty()
  year: string;

  @ApiProperty({ example: 'UBC-001' })
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @ApiProperty({ example: 'Ubicaciones' })
  @IsString()
  @IsNotEmpty()
  categoria: string;
}



@Controller('sharepoint')
export class SharePointController {
  constructor(private readonly sharepointService: SharePointService) {}


 @Post('upload')
  @ApiOperation({ summary: 'Subir imagen optimizada a SharePoint' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary', description: 'La imagen a subir' },
        year: { type: 'string', example: '2026' },
        codigo: { type: 'string', example: 'UBC001' },
        categoria: { type: 'string', example: 'Ubicaciones' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async probarUpload(
    // 🔥 EL TRUCO: Usamos @Req() en lugar de @UploadedFile()
    // NestJS está programado para NUNCA validar el objeto Req.
    @Req() req: any, 
    @Body() data: UploadPruebaDto,
  ) {
    // Extraemos el archivo manualmente de la petición
    const file = req.file;

    if (!file) {
      throw new BadRequestException('La imagen es obligatoria');
    }

    return this.sharepointService.uploadToMantenimiento(file, {
      year: data.year,
      codigo: data.codigo,
      categoria: data.categoria,
    });
  }

  

  @Post('expediente')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDto })
  @UseInterceptors(FileInterceptor('file'))
  async uploadToExpediente(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: FileUploadDto
  ) {
    if (!file) throw new BadRequestException('No se recibió ningún archivo');
    if (!body.year || !body.codigo || !body.categoria) {
      throw new BadRequestException('Faltan campos: year, codigo o categoria');
    }
    return await this.sharepointService.uploadEmployeeFile(file, body);
  }

  @Get('download-file')
  async downloadFile(@Query('url') fileUrl: string, @Res() res: Response) {
    try {
      const buffer = await this.sharepointService.getFileBuffer(fileUrl);
      const fileName = fileUrl.split('?')[0].split('/').pop() || 'archivo_expediente';
      res.attachment(fileName);
      res.setHeader('Content-Type', 'application/octet-stream');
      return res.send(buffer);
    } catch (error) {
      return res.status(500).json({ message: 'Error interno al procesar el archivo' });
    }
  }


  
  @Post('mantenimiento')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDto })
  @UseInterceptors(FileInterceptor('file'))
  async uploadToMantenimiento(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: FileUploadDto
  ) {
    if (!file) throw new BadRequestException('No se recibió ningún archivo');
    if (!body.year || !body.codigo || !body.categoria) {
      throw new BadRequestException('Faltan campos: year, codigo o categoria');
    }
    return await this.sharepointService.uploadToMantenimiento(file, body);
  }
}
