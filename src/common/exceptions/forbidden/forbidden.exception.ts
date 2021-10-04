import { HttpException, HttpStatus } from '@nestjs/common'

/**
 * Instantiate a ForbiddenException Exception.
 *
 * @example
 * ```typescript
 * throw new ForbiddenException(1, EntityType)
 * ```
 *
 * @param identifier defines the entity id or unique identifier value.
 * @param type defines the entity type.
 */
export class ForbiddenException extends HttpException {
  constructor() {
    super(
      'You do not have permissions to access these sources or execute this action',
      HttpStatus.FORBIDDEN,
    )
  }
}
