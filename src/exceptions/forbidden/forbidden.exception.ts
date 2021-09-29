import { HttpException, HttpStatus } from '@nestjs/common'

export class ForbiddenException extends HttpException {
  constructor() {
    super(
      'You do not have permissions to access these sources or execute this action',
      HttpStatus.FORBIDDEN,
    )
  }
}
