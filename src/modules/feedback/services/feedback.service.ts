import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CrudRequest, GetManyDefaultResponse } from '@nestjsx/crud'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Repository } from 'typeorm'

import { EntityAlreadyDisabledException } from '../../../exceptions/conflict/entity-already-disabled.exception'
import { EntityAlreadyEnabledException } from '../../../exceptions/conflict/entity-already-enabled.exception'
import { EntityNotFoundException } from '../../../exceptions/not-found/entity-not-found.exception'

import { FeedbackEntity } from '../entities/feedback.entity'

import { CreateFeedbackDto } from '../models/create-feedback.dto'
import { UpdateFeedbackDto } from '../models/update-feedback.dto'

/**
 * Service that deals with the `feedback` data.
 */
@Injectable()
export class FeedbackService extends TypeOrmCrudService<FeedbackEntity> {
  constructor(
    @InjectRepository(FeedbackEntity)
    private readonly repository: Repository<FeedbackEntity>,
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
    dto: CreateFeedbackDto,
  ): Promise<FeedbackEntity> {
    return this.repository.save(new FeedbackEntity(dto))
  }

  /**
   * Method that searches for one entity based on it id.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @returns an object that represents the found entity.
   */
  async getOne(crudRequest: CrudRequest): Promise<FeedbackEntity> {
    const id = this.getParamFilters(crudRequest.parsed).id

    const feedback = await super.getOne(crudRequest).catch(() => undefined)
    if (!feedback) {
      throw new EntityNotFoundException(id, FeedbackEntity)
    }

    return feedback
  }

  /**
   * Method that searches for several entities.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @returns an object that represents all the the found entities.
   */
  async getMany(
    crudRequest: CrudRequest,
  ): Promise<GetManyDefaultResponse<FeedbackEntity> | FeedbackEntity[]> {
    return await super.getMany(crudRequest)
  }

  /**
   * Method that updates some entity data.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @param dto defines an object that represents the new entity data.
   * @returns an object that represents the updated entity.
   */
  async updateOne(
    crudRequest: CrudRequest,
    dto: UpdateFeedbackDto,
  ): Promise<FeedbackEntity> {
    const id = this.getParamFilters(crudRequest.parsed).id

    const feedback = await super.getOne(crudRequest).catch(() => undefined)
    if (!feedback) {
      throw new EntityNotFoundException(id, FeedbackEntity)
    }

    await this.repository.update(id, dto)
    await feedback.reload()

    return feedback
  }

  /**
   * Method that deletes some entity.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @returns an object that represents the deleted entity.
   */
  async deleteOne(crudRequest: CrudRequest): Promise<FeedbackEntity> {
    const id = this.getParamFilters(crudRequest.parsed).id

    const feedback = await super.getOne(crudRequest).catch(() => undefined)
    if (!feedback) {
      throw new EntityNotFoundException(id, FeedbackEntity)
    }

    await this.repository.delete(id)

    return feedback
  }

  /**
   * Method that disables some entity.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @returns an object that represents the disabled entity.
   */
  async disableOne(crudRequest: CrudRequest): Promise<FeedbackEntity> {
    const id = this.getParamFilters(crudRequest.parsed).id

    const feedback = await super.getOne(crudRequest).catch(() => undefined)
    if (!feedback) {
      throw new EntityNotFoundException(id, FeedbackEntity)
    }

    if (!feedback.isActive) {
      throw new EntityAlreadyDisabledException(id, FeedbackEntity)
    }

    await this.repository.update(id, {
      isActive: false,
    })
    await feedback.reload()

    return feedback
  }

  /**
   * Method that enables some entity.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @returns an object that represents the enabled entity.
   */
  async enableOne(crudRequest: CrudRequest): Promise<FeedbackEntity> {
    const id = this.getParamFilters(crudRequest.parsed).id

    const feedback = await super.getOne(crudRequest).catch(() => undefined)
    if (!feedback) {
      throw new EntityNotFoundException(id, FeedbackEntity)
    }

    if (feedback.isActive) {
      throw new EntityAlreadyEnabledException(id, FeedbackEntity)
    }

    await this.repository.update(id, {
      isActive: true,
    })
    await feedback.reload()

    return feedback
  }
}
