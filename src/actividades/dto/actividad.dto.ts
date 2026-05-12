import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateActividadDto {
  @ApiProperty({ 
    description: 'Descripción de la actividad a realizar',
    example: 'Revisar nivel de aceite',
  })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({ 
    description: 'Indica si la actividad fue realizada',
    example: false,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  realizada?: boolean;

  @ApiProperty({ 
    description: 'Observaciones sobre la actividad',
    example: 'Nivel óptimo',
    required: false
  })
  @IsOptional()
  @IsString()
  observaciones?: string;

  @ApiProperty({ 
    description: 'ID de la orden de trabajo a la que pertenece',
    example: 1,
  })
  @IsNumber()
  @Type(() => Number)
  ordenTrabajoId: number;
}

export class UpdateActividadDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  realizada?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  observaciones?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  ordenTrabajoId?: number;
}
