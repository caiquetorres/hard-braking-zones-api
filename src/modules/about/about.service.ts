import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CrudRequest } from '@nestjsx/crud'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Repository } from 'typeorm'

import { EntityAlreadyDisabledException } from '../../exceptions/conflict/entity-already-disabled.exception'
import { EntityAlreadyEnabledException } from '../../exceptions/conflict/entity-already-enabled.exception'
import { EntityNotFoundException } from '../../exceptions/not-found/entity-not-found.exception'

import { AboutEntity } from './entities/about.entity'

import { PageDto } from '../../shared/page.dto'
import { CreateAboutDto } from './dtos/create-about.dto'
import { UpdateAboutDto } from './dtos/update-about.dto'

/**
 * Service that deals with the `about` data.
 */
@Injectable()
export class AboutService extends TypeOrmCrudService<AboutEntity> {
  constructor(
    @InjectRepository(AboutEntity)
    private readonly repository: Repository<AboutEntity>,
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
    dto: CreateAboutDto,
  ): Promise<AboutEntity> {
    return this.repository.save(new AboutEntity(dto))
  }

  /**
   * Method that searches for one entity based on it id.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @returns an object that represents the found entity.
   */
  async getOne(crudRequest: CrudRequest): Promise<AboutEntity> {
    const id = this.getParamFilters(crudRequest.parsed).id

    const about = await super.getOne(crudRequest).catch(() => undefined)
    if (!about) {
      throw new EntityNotFoundException(id, AboutEntity)
    }

    return about
  }

  /**
   * Method that searches for several entities.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @returns an object that represents all the the found entities.
   */
  async getMany(
    crudRequest: CrudRequest,
  ): Promise<PageDto<AboutEntity> | AboutEntity[]> {
    return super.getMany(crudRequest)
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
    dto: UpdateAboutDto,
  ): Promise<AboutEntity> {
    const id = this.getParamFilters(crudRequest.parsed).id

    const about = await super.getOne(crudRequest).catch(() => undefined)
    if (!about) {
      throw new EntityNotFoundException(id, AboutEntity)
    }

    await this.repository.update(id, dto)
    await about.reload()

    return about
  }

  /**
   * Method that deletes some entity.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @returns an object that represents the deleted entity.
   */
  async deleteOne(crudRequest: CrudRequest): Promise<AboutEntity> {
    const id = this.getParamFilters(crudRequest.parsed).id

    const about = await super.getOne(crudRequest).catch(() => undefined)
    if (!about) {
      throw new EntityNotFoundException(id, AboutEntity)
    }

    await this.repository.delete(id)

    return about
  }

  /**
   * Method that disables some entity.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @returns an object that represents the disabled entity.
   */
  async disableOne(crudRequest: CrudRequest): Promise<AboutEntity> {
    const id = this.getParamFilters(crudRequest.parsed).id

    const about = await super.getOne(crudRequest).catch(() => undefined)
    if (!about) {
      throw new EntityNotFoundException(id, AboutEntity)
    }

    if (!about.isActive) {
      throw new EntityAlreadyDisabledException(id, AboutEntity)
    }

    await this.repository.update(id, {
      isActive: false,
    })
    await about.reload()

    return about
  }

  /**
   * Method that enables some entity.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @returns an object that represents the enabled entity.
   */
  async enableOne(crudRequest: CrudRequest): Promise<AboutEntity> {
    const id = this.getParamFilters(crudRequest.parsed).id

    const about = await super.getOne(crudRequest).catch(() => undefined)
    if (!about) {
      throw new EntityNotFoundException(id, AboutEntity)
    }

    if (about.isActive) {
      throw new EntityAlreadyEnabledException(id, AboutEntity)
    }

    await this.repository.update(id, {
      isActive: true,
    })
    await about.reload()

    return about
  }
}
