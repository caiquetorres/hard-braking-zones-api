import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { CrudRequestInterceptor } from '@nestjsx/crud'

import { EnvService } from './env/env.service'

import { AppModule } from './app.module'
import { SentryFilter } from './common/filters/sentry/sentry.filter'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  const envService = app.get(EnvService)
  const reflector = app.get(Reflector)

  setupPipes(app)
  setupInterceptors(app, reflector)
  setupFilters(app, envService)
  setupSwagger(app, envService)

  app.enableCors()

  await app.listen(envService.get('PORT') || 3000)
}
bootstrap()

/**
 * Function that setup all the global application pipes.
 *
 * @param app defines an object that represents the application instance.
 */
function setupPipes(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
}

/**
 * Function that setup all the global application interceptors.
 *
 * @param app defines an object that represents the application instance.
 * @param reflector defines an object that represents the application
 * reflector.
 */
function setupInterceptors(app: INestApplication, reflector: Reflector): void {
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector),
    new CrudRequestInterceptor(),
  )
}

/**
 * Function that setup all the global application filters.
 *
 * @param app defines an object that represents the application instance.
 * @param envService defines an object that represents the application
 * environment service.
 */
function setupFilters(app: INestApplication, envService: EnvService): void {
  app.useGlobalFilters(new SentryFilter(envService))
}

/**
 * Function that setup the swagger.
 *
 * @param app defines an object that represents the application instance.
 * @param envService defines an object that represents the application
 * environment service.
 */
function setupSwagger(app: INestApplication, env: EnvService): void {
  const config = new DocumentBuilder()
    .setTitle(env.get('SWAGGER_TITLE'))
    .setDescription(env.get('SWAGGER_DESCRIPTION'))
    .setVersion(env.get('SWAGGER_VERSION'))
    .addTag(env.get('SWAGGER_TAG'))
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup(`swagger`, app, document)
}
