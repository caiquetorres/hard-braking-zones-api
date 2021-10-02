import { HttpException, HttpStatus, Type } from '@nestjs/common'

export class EntityNotFoundException extends HttpException {
  constructor(identifier: number | string, type?: Type<unknown>) {
    super(
      `The entity identified by '${identifier}'${
        type ? ` of type '${type.name}'` : ''
      } does not exist or is disabled`,
      HttpStatus.CONFLICT,
    )
  }
}
