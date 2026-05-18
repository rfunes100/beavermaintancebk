import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    // 1. Si no hay valor o no hay tipo que validar (como en un DELETE), pasar directo
    if (!metatype || !this.toValidate(metatype) || value === undefined || value === null) {
      return value;
    }

    // 2. Transformar el valor plano al objeto de la clase DTO
    const object = plainToInstance(metatype, value);
    
    // 3. Validar solo si el objeto resultante es válido para class-validator
    const errors = await validate(object);
    
    if (errors.length > 0) {
      const messages = errors.map((err: ValidationError) => ({
        property: err.property,
        constraints: err.constraints,
      }));
      throw new BadRequestException({
        message: 'Validación fallida',
        errors: messages,
      });
    }
    
    return object;
  }

  // FUNCIÓN CLAVE: Determina si el tipo es algo que se deba validar (un DTO)
  // o si es un tipo simple (String, Number, etc.) que debe ignorarse
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}