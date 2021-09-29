import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { ForbiddenException } from '../../exceptions/forbidden/forbidden.exception'

import { UserEntity } from '../../modules/user/entities/user.entity'

import { Request } from 'express'

/**
 * Guard responsible for assigning roles to some route.
 */
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  /**
   * Method that validates if the request can be completed based on the
   * request user roles.
   *
   * @param context defines an object that represents the current request
   * context.
   * @returns true if the request can be completed, otherwise false.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())

    if (!roles || !roles.length) {
      return true
    }

    const requestUser = context
      .switchToHttp()
      .getRequest<Request & { user: UserEntity }>().user

    if (!requestUser) {
      throw new ForbiddenException()
    }

    const hasRole = requestUser.role
      .split('|')
      .some((role) => roles.includes(role))

    if (requestUser.role && hasRole) {
      return true
    }

    throw new ForbiddenException()
  }
}
