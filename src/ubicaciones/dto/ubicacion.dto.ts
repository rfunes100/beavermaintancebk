import 'multer';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsInt } from 'class-validator';
import { Type, Transform } from 'class-transformer';


export class CreateUbicacionDto {
  @ApiProperty({ 
    description: 'Nombre de la ubicación',
    example: 'Planta Principal',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ 
    description: 'Dirección detallada',
    example: 'Kilómetro 15, Carretera Norte',
    required: false
  })
  @IsOptional()
  @IsString()
  direccion?: string;


  @ApiProperty({
    description: 'ID de la ubicación a la que pertenece el departamento',
    example: 10,
    required: false,
  })
  @IsOptional()
  @Type(() => Number) // Transforma el dato a número por seguridad
  @IsInt({ message: 'El ID de la ubicación padre debe ser un número entero' })
  parentUbicacionId?: number;

  @ApiProperty({ 
    description: 'Indica si se debe poner en el mapa',
    example: true,
  })
  @Transform(({ value }) => {
    // Esto convierte 1, "1", "true" o true en un booleano real de JS
    if (value === 1 || value === '1' || value === 'true' || value === true || value === 'on') return true;
    return false;
  })
  @IsBoolean()
  ponerEnMapa: boolean;

  @ApiProperty({ 
    description: 'Latitud para el mapa',
    example: 9.9281,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  latitud?: number;

  @ApiProperty({ 
    description: 'Longitud para el mapa',
    example: -84.0907,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  longitud?: number;

  @ApiProperty({ 
    description: 'URL de la imagen (generada automáticamente)',
    required: false,
    readOnly: true
  })
  @IsOptional()
  @IsString()
  imagenUrl?: string;

  @ApiProperty({ 
    description: 'Imágen de la ubicación (archivo)', 
    type: 'string',
    format: 'binary',
    required: false
  })
  @IsOptional()
  imagen?: Express.Multer.File;
}

export class UpdateUbicacionDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  nombre?: string;


  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  parentUbicacionId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  direccion?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true' || value === 1 || value === '1') return true;
    if (value === 'false' || value === 0 || value === '0') return false;
    return value;
  })
  @IsBoolean()
  ponerEnMapa?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  latitud?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  longitud?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  imagenUrl?: string;
}
