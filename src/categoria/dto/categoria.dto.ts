import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty({ 
    description: 'Nombre de la categoría',
    example: 'Maquinaria Pesada',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ 
    description: 'Descripción de la categoría',
    example: 'Mquinas pesadas para construccin',
    required: false
  })
  @IsOptional()
  @IsString()
  descripcion?: string;
}

export class UpdateCategoriaDto {
  @ApiProperty({ 
    description: 'Nombre de la categoría',
    example: 'Maquinaria Pesada',
    required: false
  })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiProperty({ 
    description: 'Descripción de la categoría',
    example: 'Mquinas pesadas para construccin',
    required: false
  })
  @IsOptional()
  @IsString()
  descripcion?: string;
}
