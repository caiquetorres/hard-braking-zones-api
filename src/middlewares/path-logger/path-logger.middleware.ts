import { Injectable, Logger, NestMiddleware } from '@nestjs/common'

import { Request, Response, NextFunction } from 'express'

@Injectable()
export class PathLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('PathLogger')

  use(req: Request, _: Response, next: NextFunction): void {
    this.logger.debug(
      `${req.method}:${req.baseUrl.replace('/', '')}${req.path}`,
    )
    next()
  }
}
