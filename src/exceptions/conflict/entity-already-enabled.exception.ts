import { HttpException, HttpStatus, Type } from '@nestjs/common'

import { BaseEntity } from '../../shared/base.entity'

/**
 * Instantiate a EntityAlreadyEnabledException Exception.
 *
 * @example
 * ```typescript
 * throw new EntityAlreadyEnabledException(1, EntityType)
 * ```
 *
 * @param identifier defines the entity id or unique identifier value.
 * @param type defines the entity type.
 */
export class EntityAlreadyEnabledException extends HttpException {
  public constructor(identifier: number | string, type?: Type<BaseEntity>) {
    super(
      `The entity identified by '${identifier}'${
        type ? ` of type '${type.name}'` : ''
      } is already enabled`,
      HttpStatus.CONFLICT,
    )
  }
}
