import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUsuarioDto {
  @ApiProperty({ 
    description: 'ID externo del usuario (ej. de un sistema de auth)',
    example: 'auth0|123456',
  })
  @IsString()
  @IsNotEmpty()
  externoId: string;

  @ApiProperty({ 
    description: 'Nombre completo del usuario',
    example: 'Juan Pérez',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ 
    description: 'Correo electrónico del usuario',
    example: 'juan.perez@empresa.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ 
    description: 'ID del departamento al que pertenece el usuario',
    example: 1,
  })
  @IsNumber()
  @Type(() => Number)
  departamentoId: number;
}

export class UpdateUsuarioDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  externoId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  departamentoId?: number;
}
