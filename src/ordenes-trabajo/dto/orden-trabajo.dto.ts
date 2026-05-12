import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsEnum, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export enum TipoMantenimiento {
  PREVENTIVO = 'PREVENTIVO',
  CORRECTIVO = 'CORRECTIVO',
}

export enum EstadoOT {
  ABIERTA = 'ABIERTA',
  EN_PROCESO = 'EN_PROCESO',
  COMPLETADA = 'COMPLETADA',
  CANCELADA = 'CANCELADA',
}

export class CreateOrdenTrabajoDto {
  @ApiProperty({ 
    description: 'Código único de la orden de trabajo',
    example: 'OT-2023-001',
  })
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @ApiProperty({ 
    description: 'Tipo de mantenimiento',
    example: 'PREVENTIVO',
    enum: TipoMantenimiento,
  })
  @IsEnum(TipoMantenimiento)
  @IsNotEmpty()
  tipo: TipoMantenimiento;

  @ApiProperty({ 
    description: 'Estado de la orden de trabajo',
    example: 'ABIERTA',
    enum: EstadoOT,
    required: false
  })
  @IsOptional()
  @IsEnum(EstadoOT)
  estado?: EstadoOT;

  @ApiProperty({ 
    description: 'Descripción del trabajo a realizar',
    example: 'Cambio de aceite y filtros',
  })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({ 
    description: 'Fecha programada para el trabajo',
    example: '2023-05-01T08:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  fechaProgramada: string;

  @ApiProperty({ 
    description: 'Fecha de inicio real',
    example: '2023-05-01T09:00:00.000Z',
    required: false
  })
  @IsOptional()
  @IsDateString()
  fechaInicio?: string;

  @ApiProperty({ 
    description: 'Fecha de finalización real',
    example: '2023-05-01T11:00:00.000Z',
    required: false
  })
  @IsOptional()
  @IsDateString()
  fechaFin?: string;

  @ApiProperty({ 
    description: 'Lectura de kilometraje al momento del mantenimiento',
    example: 15000.5,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  lecturaKm?: number;

  @ApiProperty({ 
    description: 'Lectura de horas al momento del mantenimiento',
    example: 1200.0,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  lecturaHoras?: number;

  @ApiProperty({ 
    description: 'ID del equipo',
    example: 1,
  })
  @IsNumber()
  @Type(() => Number)
  equipoId: number;

  @ApiProperty({ 
    description: 'ID del usuario responsable',
    example: 1,
  })
  @IsNumber()
  @Type(() => Number)
  responsableId: number;

  @ApiProperty({ 
    description: 'ID de la solicitud de mantenimiento origen',
    example: 1,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  solicitudId?: number;
}

export class UpdateOrdenTrabajoDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  codigo?: string;

  @ApiProperty({ enum: TipoMantenimiento, required: false })
  @IsOptional()
  @IsEnum(TipoMantenimiento)
  tipo?: TipoMantenimiento;

  @ApiProperty({ enum: EstadoOT, required: false })
  @IsOptional()
  @IsEnum(EstadoOT)
  estado?: EstadoOT;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  fechaProgramada?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  fechaInicio?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  fechaFin?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  lecturaKm?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  lecturaHoras?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  equipoId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  responsableId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  solicitudId?: number;
}
