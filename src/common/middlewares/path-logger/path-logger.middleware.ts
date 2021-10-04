import { Injectable, Logger, NestMiddleware } from '@nestjs/common'

import { Request, Response, NextFunction } from 'express'

/**
 * Middleware that logs the consumed route, with it post, path, status code
 * and length.
 */
@Injectable()
export class PathLoggerMiddleware implements NestMiddleware {
  /**
   * Property that defines an object used to log this class information.
   */
  private readonly logger = new Logger('PathLogger')

  /**
   * Method that logs the consumed route, with it post, path, status code and
   * length.
   *
   * @param request defines an object that represents the request.
   * @param response defines an object that represents the response.
   * @param next defines the function that is called in order to continue
   * the request.
   */
  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl } = request

    response.on('finish', () => {
      const { statusCode } = response
      const contentLength = response.get('content-length')

      this.logger.debug(
        `${method} ${originalUrl} ${statusCode} ${`${contentLength} bytes`}`,
      )
    })

    next()
  }
}
