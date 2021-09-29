/* eslint-disable @typescript-eslint/ban-types */

import { applyDecorators, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'

import { Roles } from '../roles/roles.decorator'

import { JwtGuard } from '../../guards/jwt/jwt.guard'
import { RoleGuard } from '../../guards/role/role.guard'

import { RoleEnum } from '../../models/enums/role.enum'

/**
 * Decorator that marks some route with some useful protections.
 *
 * @param roles defines an array of roles that can access the marked route.
 */
export function ProtectTo(
  ...roles: RoleEnum[]
): <TFunction extends Function, Y>(
  target: object | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>,
) => void {
  return applyDecorators(
    ApiBearerAuth(),
    Roles(...roles),
    UseGuards(JwtGuard, RoleGuard),
  )
}
