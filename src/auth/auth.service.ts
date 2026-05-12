import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private http: HttpService,
  ) {}

  async validarYSincronizarUsuario(token: string) {
    try {
      // 1. Llamada a tu API de seguridad externa (Red Privada)
      // En modo prueba podrías retornar un objeto quemado
      const response = await firstValueFrom<AxiosResponse<any>>(
        this.http.get('http://api-seguridad.interna/validate', {
          headers: { Authorization: `Bearer ${token}` }
        })
      );
      
      const userData = response.data; // { id: 'ext-123', nombre: 'Juan', email: 'juan@empresa.com', depto: 'Sistemas' }

      // 2. Buscar o Crear el usuario en nuestra base de datos local (TiDB)
      // Esto "arrastra" al usuario automáticamente
      let usuario = await this.prisma.usuario.findUnique({
        where: { externoId: userData.id }
      });

      if (!usuario) {
        // Si no existe, buscamos el departamento o creamos uno genérico
        const depto = await this.prisma.departamento.upsert({
          where: { nombre: userData.depto || 'General' },
          update: {},
          create: { nombre: userData.depto || 'General' }
        });

        usuario = await this.prisma.usuario.create({
          data: {
            externoId: userData.id,
            nombre: userData.nombre,
            email: userData.email,
            departamentoId: depto.id
          }
        });
      }

      return usuario;
    } catch (e) {
      throw new UnauthorizedException('Token inválido o API de seguridad no disponible');
    }
  }
}