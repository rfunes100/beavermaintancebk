import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProveedorDto {
  @ApiProperty({ 
    description: 'Nombre del proveedor',
    example: 'Suministros Industriales S.A.',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ 
    description: 'Persona de contacto',
    example: 'Juan Rodríguez',
    required: false
  })
  @IsOptional()
  @IsString()
  contacto?: string;
}

export class UpdateProveedorDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  contacto?: string;
}
