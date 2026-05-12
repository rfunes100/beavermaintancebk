import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export enum Prioridad {
  BAJA = 'BAJA',
  MEDIA = 'MEDIA',
  ALTA = 'ALTA',
  CRITICA = 'CRITICA',
}

export enum EstadoSolicitud {
  PENDIENTE = 'PENDIENTE',
  APROBADA = 'APROBADA',
  RECHAZADA = 'RECHAZADA',
  EN_PROCESO = 'EN_PROCESO',
}

export class CreateSolicitudDto {
  @ApiProperty({ 
    description: 'Descripción del problema o requerimiento',
    example: 'El aire acondicionado no enfría',
  })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({ 
    description: 'Prioridad de la solicitud',
    example: 'MEDIA',
    enum: Prioridad,
    required: false
  })
  @IsOptional()
  @IsEnum(Prioridad)
  prioridad?: Prioridad;

  @ApiProperty({ 
    description: 'Estado de la solicitud',
    example: 'PENDIENTE',
    enum: EstadoSolicitud,
    required: false
  })
  @IsOptional()
  @IsEnum(EstadoSolicitud)
  estado?: EstadoSolicitud;

  @ApiProperty({ 
    description: 'ID del equipo afectado',
    example: 1,
  })
  @IsNumber()
  @Type(() => Number)
  equipoId: number;

  @ApiProperty({ 
    description: 'ID del usuario que realiza la solicitud',
    example: 1,
  })
  @IsNumber()
  @Type(() => Number)
  solicitanteId: number;
}

export class UpdateSolicitudDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ enum: Prioridad, required: false })
  @IsOptional()
  @IsEnum(Prioridad)
  prioridad?: Prioridad;

  @ApiProperty({ enum: EstadoSolicitud, required: false })
  @IsOptional()
  @IsEnum(EstadoSolicitud)
  estado?: EstadoSolicitud;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  equipoId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  solicitanteId?: number;
}
