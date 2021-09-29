import { Body, Controller, Get, Post } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { Crud, CrudRequest, ParsedRequest } from '@nestjsx/crud'

import { ApiQueryGetOne } from '../../../decorators/api-query-get-one/api-query-get-one.decorator'
import { ProtectTo } from '../../../decorators/protect-to/protect-to.decorator'
import { RequestUser } from '../../../decorators/request-user/request-user.decorator'

import { UserEntity } from '../entities/user.entity'

import { RoleEnum } from '../../../models/enums/role.enum'
import { CreateUserDto } from '../models/create-user.dto'

import { UserService } from '../services/user.service'

/**
 * Controller that deals with routes related with users.
 */
@Crud({
  model: {
    type: UserEntity,
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
   * @param crudRequest defines an object that represent the sent request.
   * @param payload defines an object that has the entity data.
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
    payload: CreateUserDto,
  ): Promise<UserEntity> {
    return this.userService.createOne(crudRequest, payload)
  }

  /**
   * Method that searches one entity based on it id.
   *
   * @param crudRequest defines an object that represent the sent request.
   * @param requestUser defines an object that represents the logged user.
   * @returns an object that represents the found entity.
   */
  @ApiOperation({ summary: 'Retrieve a single UserEntity' })
  @ApiQueryGetOne()
  @ApiCreatedResponse({
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
   * Method that searches for one entity based on the request user id.
   *
   * @param crudRequest defines an object that represent the sent request.
   * @param requestUser defines an object that represents the logged user.
   * @returns an object that represents the found entity.
   */
  @ApiOperation({ summary: 'Retrieve the logged UserEntity' })
  @ApiQueryGetOne()
  @ApiCreatedResponse({
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
}
