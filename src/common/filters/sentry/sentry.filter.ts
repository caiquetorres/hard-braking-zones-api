import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import * as Sentry from '@sentry/node'

import { EnvService } from '../../../env/env.service'

import { Request, Response } from 'express'

/**
 * Class that represents the filter that capture some exception and send
 * it to sentry.io.
 */
@Catch()
export class SentryFilter implements ExceptionFilter {
  /**
   * Property that defines if the sentry is enabled or not for this
   * application.
   */
  private readonly sentryEnabled: boolean

  private readonly logger = new Logger(SentryFilter.name)

  constructor(envService: EnvService) {
    this.sentryEnabled =
      envService.get('SENTRY_ENABLED') && !!envService.get('SENTRY_DSN')

    if (this.sentryEnabled) {
      Sentry.init({
        environment: envService.get('NODE_ENV'),
        dsn: envService.get('SENTRY_DSN'),
        release: envService.get('PACKAGE_VERSION'),
      })
    }
  }

  /**
   * Method that deals with the thrown exceptions.
   *
   * @param exception defines and object that represents the thrown
   * exception.
   * @param host defines and object that represents the host arguments.
   */
  catch(exception: HttpException, host: ArgumentsHost): void {
    const context = host.switchToHttp()
    const response = context.getResponse<Response>()
    const request = context.getRequest<Request>()

    const isHttpException = exception instanceof HttpException

    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR

    if (status >= 500) {
      this.logger.error(exception.name, exception.stack)

      if (this.sentryEnabled) {
        Sentry.captureException(exception)
      }
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: isHttpException ? exception.message : 'Internal Server Error',
    })
  }
}
