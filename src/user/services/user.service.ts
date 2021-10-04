import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CrudRequest } from '@nestjsx/crud'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Repository } from 'typeorm'

import { EntityAlreadyDisabledException } from '../../common/exceptions/conflict/entity-already-disabled.exception'
import { EntityAlreadyEnabledException } from '../../common/exceptions/conflict/entity-already-enabled.exception'
import { ForbiddenException } from '../../common/exceptions/forbidden/forbidden.exception'
import { EntityNotFoundException } from '../../common/exceptions/not-found/entity-not-found.exception'

import { UserEntity } from '../entities/user.entity'

import { RoleEnum } from '../../common/models/enums/role.enum'
import { PageDto } from '../../common/models/page.dto'
import { CreateUserDto } from '../models/create-user.dto'
import { UpdateUserDto } from '../models/update-user.dto'

import { PasswordService } from '../../password/services/password.service'
import { PermissionService } from '../../permission/services/permission.service'

/**
 * Service that deals with the `user` data.
 */
@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    private readonly passwordService: PasswordService,
    private readonly permissionService: PermissionService,
  ) {
    super(repository)
  }

  /**
   * Method that creates a new entity based on the sent payload.
   *
   * @param _crudRequest defines an object that represents the sent request.
   * @param dto defines an object that has the entity data.
   * @returns an object that represents the created entity.
   */
  async createOne(
    _crudRequest: CrudRequest,
    dto: CreateUserDto,
  ): Promise<UserEntity> {
    const hasUserWithEmail = await this.hasUserWithEmail(dto.email)

    if (hasUserWithEmail) {
      throw new ConflictException(
        'An user with this email was already registered',
      )
    }

    const user = new UserEntity(dto)

    user.password = await this.passwordService.encryptPassword(user.password)
    user.role = RoleEnum.common

    return this.repository.save(user)
  }

  /**
   * Method that searches for one entity based on it id.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @param requestUser defines an object that represents the logged user.
   * @returns an object that represents the found entity.
   */
  async getOne(
    crudRequest: CrudRequest,
    requestUser?: UserEntity,
  ): Promise<UserEntity> {
    const id = this.getParamFilters(crudRequest.parsed).id

    if (requestUser) {
      if (!this.permissionService.hasPermission(requestUser, id)) {
        throw new ForbiddenException()
      }
    }

    const user = await super.getOne(crudRequest).catch(() => undefined)
    if (!user) {
      throw new EntityNotFoundException(id, UserEntity)
    }

    return user
  }

  /**
   * Method that searches for one entity based on the request user id.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @param requestUser defines an object that represents the logged user.
   * @returns an object that represents the found entity.
   */
  async getMe(
    crudRequest: CrudRequest,
    requestUser?: UserEntity,
  ): Promise<UserEntity> {
    const { id } = requestUser

    crudRequest.parsed.search.$and.push({
      id: {
        $eq: id,
      },
    })

    const user = await super.getOne(crudRequest).catch(() => undefined)
    if (!user) {
      throw new EntityNotFoundException(id, UserEntity)
    }

    return user
  }

  /**
   * Method that searches for several entities.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @returns an object that represents all the the found entities.
   */
  async getMany(
    crudRequest: CrudRequest,
  ): Promise<PageDto<UserEntity> | UserEntity[]> {
    return super.getMany(crudRequest)
  }

  /**
   * Method that updates some entity data.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @param dto defines an object that represents the new entity data.
   * @param requestUser defines an object that represents the logged user.
   * @returns an object that represents the updated entity.
   */
  async updateOne(
    crudRequest: CrudRequest,
    dto: UpdateUserDto,
    requestUser?: UserEntity,
  ): Promise<UserEntity> {
    const id = this.getParamFilters(crudRequest.parsed).id

    if (requestUser) {
      if (!this.permissionService.hasPermission(requestUser, id)) {
        throw new ForbiddenException()
      }
    }

    const user = await super.getOne(crudRequest).catch(() => undefined)
    if (!user) {
      throw new EntityNotFoundException(id, UserEntity)
    }

    await this.repository.update(id, dto)
    await user.reload()

    return user
  }

  /**
   * Method that deletes some entity.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @param requestUser defines an object that represents the logged user.
   * @returns an object that represents the deleted entity.
   */
  async deleteOne(
    crudRequest: CrudRequest,
    requestUser?: UserEntity,
  ): Promise<UserEntity> {
    const id = this.getParamFilters(crudRequest.parsed).id

    if (requestUser) {
      if (!this.permissionService.hasPermission(requestUser, id)) {
        throw new ForbiddenException()
      }
    }

    const user = await super.getOne(crudRequest).catch(() => undefined)
    if (!user) {
      throw new EntityNotFoundException(id, UserEntity)
    }

    await this.repository.delete(id)

    return user
  }

  /**
   * Method that disables some entity.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @param requestUser defines an object that represents the logged user.
   * @returns an object that represents the disabled entity.
   */
  async disableOne(
    crudRequest: CrudRequest,
    requestUser?: UserEntity,
  ): Promise<UserEntity> {
    const id = this.getParamFilters(crudRequest.parsed).id

    if (requestUser) {
      if (!this.permissionService.hasPermission(requestUser, id)) {
        throw new ForbiddenException()
      }
    }

    const user = await super.getOne(crudRequest).catch(() => undefined)
    if (!user) {
      throw new EntityNotFoundException(id, UserEntity)
    }

    if (!user.isActive) {
      throw new EntityAlreadyDisabledException(id, UserEntity)
    }

    await this.repository.update(id, {
      isActive: false,
    })
    await user.reload()

    return user
  }

  /**
   * Method that enables some entity.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @param requestUser defines an object that represents the logged user.
   * @returns an object that represents the enabled entity.
   */
  async enableOne(
    crudRequest: CrudRequest,
    requestUser?: UserEntity,
  ): Promise<UserEntity> {
    const id = this.getParamFilters(crudRequest.parsed).id

    if (requestUser) {
      if (!this.permissionService.hasPermission(requestUser, id)) {
        throw new ForbiddenException()
      }
    }

    const user = await super.getOne(crudRequest).catch(() => undefined)
    if (!user) {
      throw new EntityNotFoundException(id, UserEntity)
    }

    if (user.isActive) {
      throw new EntityAlreadyEnabledException(id, UserEntity)
    }

    await this.repository.update(id, {
      isActive: true,
    })
    await user.reload()

    return user
  }

  /**
   * Method that checks if some email is already related to some user.
   *
   * @param email defines the email that will be checked.
   * @returns true if the email already exists, otherwise false.
   */
  async hasUserWithEmail(email: string): Promise<boolean> {
    const user = await this.repository.findOne({ email })
    return !!user
  }
}
