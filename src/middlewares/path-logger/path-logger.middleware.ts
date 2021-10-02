import { Injectable, Logger, NestMiddleware } from '@nestjs/common'

import { Request, Response, NextFunction } from 'express'

@Injectable()
export class PathLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('PathLogger')

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
