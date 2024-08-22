declare const module: any;
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import { SwaggerConfig } from './config/docs/swagger.config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
 
  app.use(session
    ({
      secret: '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',
      resave: false,
      saveUninitialized:  false,
      cookie: { maxAge: 3600000 }
    }));

    SwaggerConfig.config(app);
  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}));
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*'
  });
  await app.listen(port);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  app.enableShutdownHooks();
}
bootstrap();
