import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePlanMantenimientoDto {
  @ApiProperty({ 
    description: 'Descripción del plan de mantenimiento',
    example: 'Mantenimiento preventivo mensual',
  })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({ 
    description: 'Frecuencia en días',
    example: 30,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  frecuenciaDias?: number;

  @ApiProperty({ 
    description: 'Frecuencia en kilómetros',
    example: 5000,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  frecuenciaKm?: number;

  @ApiProperty({ 
    description: 'Frecuencia en horas de uso',
    example: 500,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  frecuenciaHoras?: number;

  @ApiProperty({ 
    description: 'ID del equipo al que aplica el plan',
    example: 1,
  })
  @IsNumber()
  @Type(() => Number)
  equipoId: number;
}

export class UpdatePlanMantenimientoDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  frecuenciaDias?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  frecuenciaKm?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  frecuenciaHoras?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  equipoId?: number;
}
