import { HttpException, HttpStatus } from '@nestjs/common'

export class ForbiddenException extends HttpException {
  constructor() {
    super(
      'You do not have permissions to access those sources or execute this action',
      HttpStatus.FORBIDDEN,
    )
  }
}
