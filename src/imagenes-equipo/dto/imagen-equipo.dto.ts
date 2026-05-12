import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateImagenEquipoDto {
  @ApiProperty({ 
    description: 'URL de la imagen almacenada',
    example: 'https://storage.empresa.com/equipos/equipo1.jpg',
  })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({ 
    description: 'Nombre descriptivo de la imagen',
    example: 'Vista frontal panel de control',
    required: false
  })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiProperty({ 
    description: 'ID del equipo al que pertenece la imagen',
    example: 1,
  })
  @IsNumber()
  @Type(() => Number)
  equipoId: number;
}

export class UpdateImagenEquipoDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  url?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  equipoId?: number;
}
