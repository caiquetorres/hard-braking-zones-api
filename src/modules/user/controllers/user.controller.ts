import { Body, Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger'
import {
  Crud,
  CrudRequest,
  GetManyDefaultResponse,
  ParsedRequest,
} from '@nestjsx/crud'

import { ApiQueryGetMany } from '../../../decorators/api-query-get-many/api-query-get-many.decorator'
import { ApiQueryGetOne } from '../../../decorators/api-query-get-one/api-query-get-one.decorator'
import { ProtectTo } from '../../../decorators/protect-to/protect-to.decorator'
import { RequestUser } from '../../../decorators/request-user/request-user.decorator'

import { UserEntity } from '../entities/user.entity'

import { RoleEnum } from '../../../models/enums/role.enum'
import { BaseGetManyDefaultResponseDto } from '../../../shared/base-get-many-default-response.dto'
import { CreateUserDto } from '../models/create-user.dto'
import { UpdateUserDto } from '../models/update-user.dto'

import { UserService } from '../services/user.service'

/**
 * Controller that deals with routes related with the `user` entity.
 */
@Crud({
  model: {
    type: UserEntity,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  routes: {
    exclude: [
      'createManyBase',
      'createOneBase',
      'deleteOneBase',
      'getOneBase',
      'getManyBase',
      'recoverOneBase',
      'replaceOneBase',
      'updateOneBase',
    ],
  },
})
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Method that creates a new entity based on the sent payload.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @param dto defines an object that has the entity data.
   * @returns an object that represents the created entity.
   */
  @ApiOperation({ summary: 'Create a single UserEntity' })
  @ApiCreatedResponse({
    description: 'Retrieves the created entity',
    type: UserEntity,
  })
  @ApiBadRequestResponse({
    description: 'Payload sent with invalid or missing properties.',
  })
  @Post()
  async createOne(
    @ParsedRequest()
    crudRequest: CrudRequest,
    @Body()
    dto: CreateUserDto,
  ): Promise<UserEntity> {
    return this.userService.createOne(crudRequest, dto)
  }

  /**
   * Method that searches for one entity based on the request user id.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @param requestUser defines an object that represents the logged user.
   * @returns an object that represents the found entity.
   */
  @ApiOperation({ summary: 'Retrieve the logged UserEntity' })
  @ApiQueryGetOne()
  @ApiOkResponse({
    description: 'Retrieve the logged UserEntity',
    type: UserEntity,
  })
  @ApiNotFoundResponse({ description: 'Entity not found' })
  @ProtectTo(RoleEnum.common, RoleEnum.admin)
  @Get('me')
  async getMe(
    @ParsedRequest()
    crudRequest: CrudRequest,
    @RequestUser()
    requestUser: UserEntity,
  ): Promise<UserEntity> {
    return this.userService.getMe(crudRequest, requestUser)
  }

  /**
   * Method that searches for one entity based on it id.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @param requestUser defines an object that represents the logged user.
   * @returns an object that represents the found entity.
   */
  @ApiOperation({ summary: 'Retrieve a single UserEntity' })
  @ApiQueryGetOne()
  @ApiOkResponse({
    description: 'Retrieve the found UserEntity',
    type: UserEntity,
  })
  @ApiNotFoundResponse({ description: 'Entity not found' })
  @ApiForbiddenResponse({ description: 'Request user has no permissions' })
  @ProtectTo(RoleEnum.common, RoleEnum.admin)
  @Get(':id')
  async getOne(
    @ParsedRequest()
    crudRequest: CrudRequest,
    @RequestUser()
    requestUser: UserEntity,
  ): Promise<UserEntity> {
    return this.userService.getOne(crudRequest, requestUser)
  }

  /**
   * Method that searches for several entities based on the sent route queries.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @returns an object that represents all the found entities.
   */
  @ApiOperation({ summary: 'Retrieve several UserEntities' })
  @ApiQueryGetMany()
  @ApiOkResponse({
    description: 'Retrieve several found UserEntities',
    type: () => {
      class GetManyUserEntities extends BaseGetManyDefaultResponseDto {
        @ApiProperty({
          type: UserEntity,
          isArray: true,
        })
        data: UserEntity[]
      }
      return GetManyUserEntities
    },
  })
  @ApiForbiddenResponse({ description: 'Request user has no permissions' })
  @ProtectTo(RoleEnum.admin)
  @Get()
  async getMany(
    @ParsedRequest()
    crudRequest: CrudRequest,
  ): Promise<GetManyDefaultResponse<UserEntity> | UserEntity[]> {
    return this.userService.getMany(crudRequest)
  }

  /**
   * Method that updates some entity data.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @param dto defines an object that represents the new entity data.
   * @param requestUser defines an object that represents the logged user.
   * @returns an object that represents the updated entity.
   */
  @ApiOperation({ summary: 'Update a single user' })
  @ApiOkResponse({
    description: 'Retrive the updated user',
    type: UserEntity,
  })
  @ApiNotFoundResponse({ description: 'Entity not found' })
  @ApiForbiddenResponse({ description: 'Request user has no permissions' })
  @ApiBadRequestResponse({
    description: 'Payload sent with invalid or missing properties.',
  })
  @ProtectTo(RoleEnum.common, RoleEnum.admin)
  @Patch(':id')
  async updateOne(
    @ParsedRequest()
    crudRequest: CrudRequest,
    @Body()
    dto: UpdateUserDto,
    @RequestUser()
    requestUser?: UserEntity,
  ): Promise<UserEntity> {
    return this.userService.updateOne(crudRequest, dto, requestUser)
  }

  /**
   * Method that deletes entity data.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @param requestUser defines an object that represents the logged user.
   * @returns an object that represents the deleted entity.
   */
  @ApiOperation({ summary: 'Delete a single user' })
  @ApiOkResponse({
    description: 'Retrive the deleted user',
    type: UserEntity,
  })
  @ApiNotFoundResponse({ description: 'Entity not found' })
  @ApiForbiddenResponse({ description: 'Request user has no permissions' })
  @ProtectTo(RoleEnum.common, RoleEnum.admin)
  @Delete(':id')
  async deleteOne(
    @ParsedRequest()
    crudRequest: CrudRequest,
    @RequestUser()
    requestUser?: UserEntity,
  ): Promise<UserEntity> {
    return this.userService.deleteOne(crudRequest, requestUser)
  }

  /**
   * Method that disables entity data.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @param requestUser defines an object that represents the logged user.
   * @returns an object that represents the disabled entity.
   */
  @ApiOperation({ summary: 'Disable a single user' })
  @ApiOkResponse({
    description: 'Retrive the disabled user',
    type: UserEntity,
  })
  @ApiNotFoundResponse({ description: 'Entity not found' })
  @ApiForbiddenResponse({ description: 'Request user has no permissions' })
  @ApiConflictResponse({ description: 'Entity already disabled' })
  @ProtectTo(RoleEnum.common, RoleEnum.admin)
  @Put(':id/disable')
  async disableOne(
    @ParsedRequest()
    crudRequest: CrudRequest,
    @RequestUser()
    requestUser?: UserEntity,
  ): Promise<UserEntity> {
    return this.userService.disableOne(crudRequest, requestUser)
  }

  /**
   * Method that enables entity data.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @param requestUser defines an object that represents the logged user.
   * @returns an object that represents the enabled entity.
   */
  @ApiOperation({ summary: 'Enable a single user' })
  @ApiOkResponse({
    description: 'Retrive the enabled user',
    type: UserEntity,
  })
  @ApiNotFoundResponse({ description: 'Entity not found' })
  @ApiForbiddenResponse({ description: 'Request user has no permissions' })
  @ApiConflictResponse({ description: 'Entity already enabled' })
  @ProtectTo(RoleEnum.admin)
  @Put(':id/enable')
  async enableOne(
    @ParsedRequest()
    crudRequest: CrudRequest,
    @RequestUser()
    requestUser?: UserEntity,
  ): Promise<UserEntity> {
    return this.userService.enableOne(crudRequest, requestUser)
  }
}
