import { CustomDecorator, SetMetadata } from '@nestjs/common'

import { RoleEnum } from '../../models/enums/role.enum'

/**
 * Decorator that maks some route with all the roles are allowed to access
 * it.
 *
 * @param roles defines which roles are allowed to access it.
 */
export const Roles = (...roles: RoleEnum[]): CustomDecorator =>
  SetMetadata('roles', roles)
