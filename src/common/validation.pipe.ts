import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    console.log('ValidationPipe value:', value);
    console.log('ValidationPipe metatype:', metatype);
    if (!metatype) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    console.log('ValidationPipe transformed object:', object);
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
}
