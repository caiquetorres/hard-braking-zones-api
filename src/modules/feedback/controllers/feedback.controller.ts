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
import { Crud, CrudRequest, ParsedRequest } from '@nestjsx/crud'

import { ApiQueryGetMany } from '../../../decorators/api-query-get-many/api-query-get-many.decorator'
import { ApiQueryGetOne } from '../../../decorators/api-query-get-one/api-query-get-one.decorator'
import { ProtectTo } from '../../../decorators/protect-to/protect-to.decorator'

import { FeedbackEntity } from '../entities/feedback.entity'

import { RoleEnum } from '../../../models/enums/role.enum'
import { PageDto } from '../../../shared/page.dto'
import { CreateFeedbackDto } from '../models/create-feedback.dto'
import { UpdateFeedbackDto } from '../models/update-feedback.dto'

import { FeedbackService } from '../services/feedback.service'

/**
 * Controller that deals with routes related with the `feedback` entity.
 */
@Crud({
  model: {
    type: FeedbackEntity,
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
@ApiTags('feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  /**
   * Method that creates a new entity based on the sent payload.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @param dto defines an object that has the entity data.
   * @returns an object that represents the created entity.
   */
  @ApiOperation({ summary: 'Create a single FeedbackEntity' })
  @ApiCreatedResponse({
    description: 'Retrieves the created entity',
    type: FeedbackEntity,
  })
  @ApiBadRequestResponse({
    description: 'Payload sent with invalid or missing properties.',
  })
  @Post()
  async createOne(
    @ParsedRequest()
    crudRequest: CrudRequest,
    @Body()
    dto: CreateFeedbackDto,
  ): Promise<FeedbackEntity> {
    return this.feedbackService.createOne(crudRequest, dto)
  }

  /**
   * Method that searches for one entity based on it id.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @returns an object that represents the found entity.
   */
  @ApiOperation({ summary: 'Retrieve a single FeedbackEntity' })
  @ApiQueryGetOne()
  @ApiCreatedResponse({
    description: 'Retrieve the found FeedbackEntity',
    type: FeedbackEntity,
  })
  @ApiNotFoundResponse({ description: 'Entity not found' })
  @ApiForbiddenResponse({ description: 'Request user has no permissions' })
  @ProtectTo(RoleEnum.admin)
  @Get(':id')
  async getOne(
    @ParsedRequest()
    crudRequest: CrudRequest,
  ): Promise<FeedbackEntity> {
    return this.feedbackService.getOne(crudRequest)
  }

  /**
   * Method that searches for several entities based on the sent route queries.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @returns an object that represents all the found entities.
   */
  @ApiOperation({ summary: 'Retrieve several FeedbackEntities' })
  @ApiQueryGetMany()
  @ApiOkResponse({
    description: 'Retrieve several found FeedbackEntities',
    type: () => {
      class FeedbackEntityPage extends PageDto<FeedbackEntity> {
        @ApiProperty({
          type: FeedbackEntity,
          isArray: true,
        })
        data: FeedbackEntity[]
      }
      return FeedbackEntityPage
    },
  })
  @ApiForbiddenResponse({ description: 'Request user has no permissions' })
  @ProtectTo(RoleEnum.admin)
  @Get()
  async getMany(
    @ParsedRequest()
    crudRequest: CrudRequest,
  ): Promise<PageDto<FeedbackEntity> | FeedbackEntity[]> {
    return this.feedbackService.getMany(crudRequest)
  }

  /**
   * Method that updates some entity data.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @param dto defines an object that represents the new entity data.
   * @returns an object that represents the updated entity.
   */
  @ApiOperation({ summary: 'Update a single feedback' })
  @ApiOkResponse({
    description: 'Retrive the updated feedback',
    type: FeedbackEntity,
  })
  @ApiNotFoundResponse({ description: 'Entity not found' })
  @ApiForbiddenResponse({ description: 'Request user has no permissions' })
  @ApiBadRequestResponse({
    description: 'Payload sent with invalid or missing properties.',
  })
  @ProtectTo(RoleEnum.admin)
  @Patch(':id')
  async updateOne(
    @ParsedRequest()
    crudRequest: CrudRequest,
    @Body()
    dto: UpdateFeedbackDto,
  ): Promise<FeedbackEntity> {
    return this.feedbackService.updateOne(crudRequest, dto)
  }

  /**
   * Method that deletes entity data.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @returns an object that represents the deleted entity.
   */
  @ApiOperation({ summary: 'Delete a single FeedbackEntity' })
  @ApiOkResponse({
    description: 'Retrive the deleted FeedbackEntity',
    type: FeedbackEntity,
  })
  @ApiNotFoundResponse({ description: 'Entity not found' })
  @ApiForbiddenResponse({ description: 'Request user has no permissions' })
  @ProtectTo(RoleEnum.admin)
  @Delete(':id')
  async deleteOne(
    @ParsedRequest()
    crudRequest: CrudRequest,
  ): Promise<FeedbackEntity> {
    return this.feedbackService.deleteOne(crudRequest)
  }

  /**
   * Method that disables entity data.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @returns an object that represents the disabled entity.
   */
  @ApiOperation({ summary: 'Disable a single FeedbackEntity' })
  @ApiOkResponse({
    description: 'Retrive the disabled FeedbackEntity',
    type: FeedbackEntity,
  })
  @ApiNotFoundResponse({ description: 'Entity not found' })
  @ApiForbiddenResponse({ description: 'Request user has no permissions' })
  @ApiConflictResponse({ description: 'Entity already disabled' })
  @ProtectTo(RoleEnum.admin)
  @Put(':id/disable')
  async disableOne(
    @ParsedRequest()
    crudRequest: CrudRequest,
  ): Promise<FeedbackEntity> {
    return this.feedbackService.disableOne(crudRequest)
  }

  /**
   * Method that enables entity data.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @returns an object that represents the enabled entity.
   */
  @ApiOperation({ summary: 'Enable a single FeedbackEntity' })
  @ApiOkResponse({
    description: 'Retrive the enabled FeedbackEntity',
    type: FeedbackEntity,
  })
  @ApiNotFoundResponse({ description: 'Entity not found' })
  @ApiForbiddenResponse({ description: 'Request user has no permissions' })
  @ApiConflictResponse({ description: 'Entity already enabled' })
  @ProtectTo(RoleEnum.admin)
  @Put(':id/enable')
  async enableOne(
    @ParsedRequest()
    crudRequest: CrudRequest,
  ): Promise<FeedbackEntity> {
    return this.feedbackService.enableOne(crudRequest)
  }
}
