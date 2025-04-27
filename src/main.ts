import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['verbose'],
  });

  // Configuración CORS mejorada
  const corsOptions = {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  };
  
  app.enableCors(corsOptions);

  const logger = new Logger('HTTP');
  
  // Middleware para logging
  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      return next();
    }

    const { method, originalUrl } = req;
    const startTime = Date.now();
    
    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Date.now() - startTime;
      
      logger.log(`${method} ${originalUrl} ${statusCode} - ${duration}ms`);
    });
    
    next();
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Application is running on: ${await app.getUrl()}`);
  logger.log(`CORS configuration: ${JSON.stringify(corsOptions)}`);
}
bootstrap();