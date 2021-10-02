import { HttpException, HttpStatus, Type } from '@nestjs/common'

/**
 * Instantiate a EntityNotFoundException Exception.
 *
 * @example
 * ```typescript
 * throw new EntityNotFoundException(1, EntityType)
 * ```
 *
 * @param identifier defines the entity id or unique identifier value.
 * @param type defines the entity type.
 */
export class EntityNotFoundException extends HttpException {
  constructor(identifier: number | string, type?: Type<unknown>) {
    super(
      `The entity identified by '${identifier}'${
        type ? ` of type '${type.name}'` : ''
      } does not exist or is disabled`,
      HttpStatus.NOT_FOUND,
    )
  }
}
