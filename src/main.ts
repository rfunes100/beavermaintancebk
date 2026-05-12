import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from './common/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Beaver Maintenance API')
    .setDescription('Documentación de la API para el sistema de mantenimiento Beaver')
    .setVersion('1.0')
    // Agregamos soporte para autenticación Bearer (útil por tu AuthGuard)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Ingresa tu token JWT',
        in: 'header',
      },
      'JWT-auth', // Este es el nombre de la referencia para los decoradores
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  // 'api' es la ruta donde estará disponible la documentación (ej: http://localhost:3000/api)
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
