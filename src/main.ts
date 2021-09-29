import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { CrudRequestInterceptor } from '@nestjsx/crud'

import { EnvService } from './modules/env/services/env.service'

import { AppModule } from './app.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  const envService = app.get(EnvService)
  const reflector = app.get(Reflector)

  setupPipes(app)
  setupInterceptors(app, reflector)
  setupSwagger(app, envService)

  app.enableCors()

  await app.listen(envService.get('PORT') || 3000)
}
bootstrap()

function setupPipes(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
}

function setupInterceptors(app: INestApplication, reflector: Reflector): void {
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector),
    new CrudRequestInterceptor(),
  )
}

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
