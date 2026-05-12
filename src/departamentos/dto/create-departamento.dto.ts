import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDepartamentoDto {
  @ApiProperty({
    description: 'El nombre corto o código del departamento',
    example: 'GTH',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    description: 'Descripción larga del departamento',
    example: 'GTH Gestión de talento humano',
    required: false,
  })
  @IsOptional()
  @IsString()
  descripcion?: string;
}

export class UpdateDepartamentoDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  descripcion?: string;
}
