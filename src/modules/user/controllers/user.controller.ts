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

import { UserEntity } from '../entities/user.entity'

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
   * @param _crudRequest defines an object that represent the sent request.
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
  @ApiCreatedResponse({
    description: 'Retrieve the found UserEntity',
    type: UserEntity,
  })
  @ApiNotFoundResponse({ description: 'Entity not found' })
  @ApiForbiddenResponse({ description: 'Request user has no permissions' })
  @Get(':id')
  async getOne(
    @ParsedRequest()
    crudRequest: CrudRequest,
  ): Promise<UserEntity> {
    return this.userService.getOne(crudRequest)
  }
}
