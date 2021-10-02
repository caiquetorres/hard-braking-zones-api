import { Injectable } from '@nestjs/common'

import { UserEntity } from '../../user/entities/user.entity'

import { RoleEnum } from '../../../models/enums/role.enum'

/**
 * The class that represents the service that deals with the permissions
 */
@Injectable()
export class PermissionService {
  /**
   * Method that checks if some user has the permissions to execute some
   * action in the application
   *
   * @param currentUser defines an object that represents the user that is trying
   * to access some route or doing something related with the "targetUserId"
   * @param targetUserId defines which user this entity or route is related to
   * @returns true if the user does have the permissions, otherwise false
   */
  public hasPermission(currentUser: UserEntity, targetUserId: string): boolean {
    return this.isAdmin(currentUser) || targetUserId === currentUser.id
  }

  /**
   * Method that checks if the user has the "Admin" role
   *
   * @param currentUser defines and object that represents the user that is trying
   * to access some route or doing something related with the "targetUserId"
   * @returns true if the user does have the "Admin" role, otherwise false
   */
  private isAdmin(currentUser: UserEntity): boolean {
    return (
      currentUser &&
      currentUser.role &&
      currentUser.role.includes(RoleEnum.admin)
    )
  }
}
