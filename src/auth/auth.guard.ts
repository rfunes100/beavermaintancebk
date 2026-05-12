import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) return false;

    // Aquí ocurre la magia: valida afuera y asegura que el usuario exista adentro
    const usuarioLocal = await this.authService.validarYSincronizarUsuario(token);
    
    // Inyectamos el usuario local en la request para usarlo en los controladores
    // (ej: para saber quién creó una Orden de Trabajo)
    request.user = usuarioLocal;
    
    return true;
  }
}