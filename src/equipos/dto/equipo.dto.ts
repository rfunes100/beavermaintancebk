import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsEnum, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export enum TipoEquipo {
  MOBILIARIO = 'MOBILIARIO',
  MAQUINARIA = 'MAQUINARIA',
}

export enum EstadoEquipo {
  OPERATIVO = 'OPERATIVO',
  EN_MANTENIMIENTO = 'EN_MANTENIMIENTO',
  DADO_DE_BAJA = 'DADO_DE_BAJA',
}

export class CreateEquipoDto {
  @ApiProperty({ 
    description: 'El nombre del equipo',
    example: 'Mquina CNC',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ 
    description: 'Tipo de equipo (MOBILIARIO o MAQUINARIA)',
    example: 'MAQUINARIA',
    enum: TipoEquipo,
    required: false
  })
  @IsOptional()
  @IsEnum(TipoEquipo)
  tipo?: TipoEquipo;

  @ApiProperty({ 
    description: 'Número de serie del equipo',
    example: 'SN123456',
  })
  @IsString()
  @IsNotEmpty()
  numeroSerie: string;

  @ApiProperty({ 
    description: 'Estado del equipo (OPERATIVO, EN_MANTENIMIENTO, DADO_DE_BAJA)',
    example: 'OPERATIVO',
    enum: EstadoEquipo,
    required: false
  })
  @IsOptional()
  @IsEnum(EstadoEquipo)
  estado?: EstadoEquipo;

  @ApiProperty({ 
    description: 'ID del departamento al que pertenece el equipo',
    example: 1,
  })
  @IsNumber()
  @Type(() => Number)
  departamentoId: number;

  @ApiProperty({ 
    description: 'ID de la categoría del equipo',
    example: 1,
  })
  @IsNumber()
  @Type(() => Number)
  categoriaId: number;

  @ApiProperty({ 
    description: 'Descripción del equipo',
    example: 'Mquina de corte CNC',
    required: false
  })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ 
    description: 'Fabricante del equipo',
    example: 'Caterpillar',
    required: false
  })
  @IsOptional()
  @IsString()
  fabricante?: string;

  @ApiProperty({ 
    description: 'Modelo del equipo',
    example: 'ZX200',
    required: false
  })
  @IsOptional()
  @IsString()
  modelo?: string;

  @ApiProperty({ 
    description: 'Potencia del equipo',
    example: '150 HP',
    required: false
  })
  @IsOptional()
  @IsString()
  potencia?: string;

  @ApiProperty({ 
    description: 'Código de barras del equipo',
    example: 'CB-12345',
    required: false
  })
  @IsOptional()
  @IsString()
  codigoBarras?: string;

  @ApiProperty({ 
    description: 'Costo de adquisición',
    example: 250000.50,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  costoAdquisicion?: number;

  @ApiProperty({ 
    description: 'ID de la ubicación del equipo',
    example: 1,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  ubicacionId?: number;

  @ApiProperty({ 
    description: 'Área específica donde se encuentra el equipo',
    example: 'Zona de Producción A',
    required: false
  })
  @IsOptional()
  @IsString()
  area?: string;

  @ApiProperty({ 
    description: 'Kilometraje actual',
    example: 0,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  kmActuales?: number;

  @ApiProperty({ 
    description: 'Horas actuales',
    example: 0,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  horasActuales?: number;

  @ApiProperty({ 
    description: 'ID del trabajador principal responsable',
    example: 1,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  trabajadorPrincipalId?: number;

  @ApiProperty({ 
    description: 'ID del equipo padre (si es un sub-equipo)',
    example: null,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  equipoPadreId?: number;

  @ApiProperty({ 
    description: 'ID del contratista',
    example: 1,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  contratistaId?: number;

  @ApiProperty({ 
    description: 'ID del proveedor',
    example: 1,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  proveedorId?: number;

  @ApiProperty({ 
    description: 'Fecha de puesta en servicio',
    example: '2023-01-01T00:00:00.000Z',
    required: false
  })
  @IsOptional()
  @IsDateString()
  fechaPuestaServicio?: string;

  @ApiProperty({ 
    description: 'Fecha de expiración de la garantía',
    example: '2025-01-01T00:00:00.000Z',
    required: false
  })
  @IsOptional()
  @IsDateString()
  fechaExpiracionGarantia?: string;

  @ApiProperty({ 
    description: 'Información adicional del equipo',
    example: 'Requiere mantenimiento cada 500 horas',
    required: false
  })
  @IsOptional()
  @IsString()
  informacionAdicional?: string;
}

export class UpdateEquipoDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiProperty({ enum: TipoEquipo, required: false })
  @IsOptional()
  @IsEnum(TipoEquipo)
  tipo?: TipoEquipo;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  numeroSerie?: string;

  @ApiProperty({ enum: EstadoEquipo, required: false })
  @IsOptional()
  @IsEnum(EstadoEquipo)
  estado?: EstadoEquipo;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  departamentoId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  categoriaId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  fabricante?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  modelo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  potencia?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  codigoBarras?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  costoAdquisicion?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  ubicacionId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  area?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  kmActuales?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  horasActuales?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  trabajadorPrincipalId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  equipoPadreId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  contratistaId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  proveedorId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  fechaPuestaServicio?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  fechaExpiracionGarantia?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  informacionAdicional?: string;
}
