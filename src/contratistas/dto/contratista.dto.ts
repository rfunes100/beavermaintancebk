import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateContratistaDto {
  @ApiProperty({ 
    description: 'Nombre del contratista',
    example: 'Constructora ABC',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ 
    description: 'Descripción o servicios que ofrece',
    example: 'Construcción y mantenimiento industrial',
    required: false
  })
  @IsOptional()
  @IsString()
  descripcion?: string;
}

export class UpdateContratistaDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  descripcion?: string;
}
