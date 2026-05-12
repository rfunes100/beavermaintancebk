import { firstValueFrom } from 'rxjs';

import Jimp from 'jimp';
import 'multer';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';


@Injectable()
export class SharePointService {
   private readonly listId = process.env.SHAREPOINT_LISTID_SECURE || '';

private readonly tenantId = process.env.SHAREPOINT_TENANT_ID || '';
  private readonly clientId = process.env.SHAREPOINT_CLIENT_ID || '';
  private readonly clientSecret = process.env.SHAREPOINT_CLIENT_SECRET || '';
  private readonly siteId = process.env.SHAREPOINT_SITE_ID || '';
  private readonly siteIdBusiness = process.env.SHAREPOINT_SITE_IDBUSINESS || ''; 
  private readonly driveIdEXPEDIENTES = process.env.SHAREPOINT_DRIVE_ID_EXPEDIENTES || ''; // Usamos el nuevo ID


  constructor(private readonly httpService: HttpService) {}

  // 1. Obtener Token
  async getAccessToken(): Promise<string> {
    const url = `https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/token`;
    const params = new URLSearchParams();
    params.append('client_id', this.clientId);
    params.append('client_secret', this.clientSecret);
    params.append('scope', 'https://graph.microsoft.com/.default');
    params.append('grant_type', 'client_credentials');

    const response = await firstValueFrom(
      this.httpService.post(url, params),
    );
    return response.data.access_token;
  }




  // 2. Obtener y limpiar datos de la lista
  async getUserCredentials() {
    const token = await this.getAccessToken();
    const url = `https://graph.microsoft.com/v1.0/sites/${this.siteId}/lists/${this.listId}/items?expand=fields($select=user,email,networkuser,status,createdate)`;

    const response = await firstValueFrom(
      this.httpService.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );

    // Mapeamos para devolver solo el contenido de "fields"
    return response.data.value.map(item => item.fields);
  }



  // En SharePointService
async uploadEmployeeFile(
  file: Express.Multer.File, 
  data: { year: string; codigo: string; categoria: string }
) {
  const token = await this.getAccessToken();
  const { year, codigo, categoria } = data;

  // Usar encodeURIComponent es más robusto para rutas de URL
  const cleanCategory = encodeURIComponent(categoria);
  const cleanFileName = encodeURIComponent(file.originalname);

  const biblioteca = 'Mantenimiento'; // Asegúrate que esta raíz coincida con getFileBuffer
  const fullPath = `${biblioteca}/${year}/${codigo}/${cleanCategory}/${cleanFileName}`;
  
  const url = `https://graph.microsoft.com/v1.0/drives/${this.driveIdEXPEDIENTES}/root:/${fullPath}:/content`;

  const response = await firstValueFrom(
    this.httpService.put(url, file.buffer, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': file.mimetype,
      },
    }),
  );

  return response.data; // Esto devuelve el ID de SharePoint y la webUrl
}


async uploadEmployeeFiles(
  file: Express.Multer.File, 
  data: { year: string; codigo: string; categoria: string }
) {
  const token = await this.getAccessToken();
  const { year, codigo, categoria } = data;

  

  // 1. Definimos la ruta base de la biblioteca que creaste
  const biblioteca = process.env.SHAREPOINT_LIBRARY_NAME ;

  // 2. Construimos la ruta completa: Raiz/Año/Codigo/Categoria/Archivo
  // Usamos encodeURIComponent por si la Categoría o el nombre tienen espacios
  const fullPath = `${biblioteca}/${year}/${codigo}/${categoria}/${file.originalname}`;
  
  // 3. La URL de Graph para subir con autocreación de carpetas
  //const url = `https://graph.microsoft.com/v1.0/sites/${this.siteIdBusiness}/drive/root:/${fullPath}:/content`;
  const url = `https://graph.microsoft.com/v1.0/drives/${this.driveIdEXPEDIENTES}/root:/${fullPath}:/content`;

  const response = await firstValueFrom(
    this.httpService.put(url, file.buffer, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': file.mimetype,
      },
    }),
  );

  return response.data;
}





// En sharepoint.service.ts

async getFileBuffer(fileUrl: string): Promise<Buffer> {
  try {
    const token = await this.getAccessToken();

    // 1. Extraemos la ruta relativa del archivo. 
    // Si la URL es: https://.../ExpedienteEmpleado/ExpedienteEmpleado/2000/1002/IDENTIDAD/perfil.png
    // Necesitamos lo que está después de la biblioteca principal.
    
    const libraryName = 'ExpedienteEmpleado';
    const parts = fileUrl.split(`/${libraryName}/`);
    const relativePath = parts[parts.length - 1]; // Esto nos da: "ExpedienteEmpleado/2000/1002/IDENTIDAD/perfil.png"

    // 2. Construimos la URL de Graph API para DESCARGA de contenido
    // Usamos el driveId que ya tienes configurado
    const graphUrl = `https://graph.microsoft.com/v1.0/drives/${this.driveIdEXPEDIENTES}/root:/${relativePath}:/content`;

    console.log('Llamando a Graph API:', graphUrl);

    const response = await firstValueFrom(
      this.httpService.get(graphUrl, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Accept': 'application/octet-stream'
        },
        responseType: 'arraybuffer', // VITAL para recibir archivos
      }),
    );

    return Buffer.from(response.data);
  } catch (error: any) {
    const errorData = error.response?.data ? JSON.stringify(error.response.data) : error.message;
    console.error('Error detallado de Microsoft Graph:', errorData);
    throw new Error(`Error al obtener archivo de Graph: ${errorData}`);
  }
}


async uploadToMantenimiento(
  file: Express.Multer.File,
  data: { year: string; codigo: string; categoria: string }
) {
  const token = await this.getAccessToken();
  const { year, codigo, categoria } = data;

  const cleanCategory = categoria.replace(/\s+/g, '_');
  const cleanFileName = file.originalname.replace(/\s+/g, '_');

  let buffer = file.buffer;

  try {
    const image: any = await Jimp.read(buffer);
    
    image.resize(800, Jimp.AUTO);
    
    buffer = await image.getBufferAsync(Jimp.MIME_JPEG);
  } catch (error: any) {
    console.log('No se pudo optimizar la imagen, usando original:', error);
  }

  const biblioteca = 'Mantenimiento';
  const fullPath = `${biblioteca}/${year}/${codigo}/${cleanCategory}/${cleanFileName}`;

  const url = `https://graph.microsoft.com/v1.0/drives/${this.driveIdEXPEDIENTES}/root:/${fullPath}:/content`;

  const response = await firstValueFrom(
    this.httpService.put(url, buffer, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'image/jpeg',
      },
    }),
  );

  return response.data;
}
}
