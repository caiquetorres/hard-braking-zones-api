import { HttpException, HttpStatus, Type } from '@nestjs/common'

import { BaseEntity } from '../../shared/base.entity'

/**
 * Instantiate a EntityAlreadyDisabledException Exception.
 *
 * @example
 * ```typescript
 * throw new EntityAlreadyDisabledException(1, EntityType)
 * ```
 *
 * @param identifier defines the entity id or unique identifier value.
 * @param type defines the entity type.
 */
export class EntityAlreadyDisabledException extends HttpException {
  constructor(identifier: number | string, type?: Type<BaseEntity>) {
    super(
      `The entity identified by '${identifier}'${
        type ? ` of type '${type.name}'` : ''
      } is already disabled`,
      HttpStatus.CONFLICT,
    )
  }
}
