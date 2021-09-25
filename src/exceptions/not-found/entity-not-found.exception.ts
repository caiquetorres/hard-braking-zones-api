import { HttpException, HttpStatus, Type } from '@nestjs/common'

export class EntityNotFoundException extends HttpException {
  constructor(identifier: number | string, type?: Type<unknown>) {
    if (type) {
      super(
        `The entity of type '${type.name}' identified by '${identifier}' does not exist or is disabled`,
        HttpStatus.NOT_FOUND,
      )
    } else {
      super(
        `The entity identified by '${identifier}' does not exist or is disabled`,
        HttpStatus.NOT_FOUND,
      )
    }
  }
}
