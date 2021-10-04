import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CrudRequest } from '@nestjsx/crud'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Repository } from 'typeorm'

import { EntityAlreadyDisabledException } from '../../exceptions/conflict/entity-already-disabled.exception'
import { EntityAlreadyEnabledException } from '../../exceptions/conflict/entity-already-enabled.exception'
import { EntityNotFoundException } from '../../exceptions/not-found/entity-not-found.exception'

import { InfoEntity } from './entities/info.entity'

import { PageDto } from '../../shared/page.dto'
import { CreateInfoDto } from './dtos/create-info.dto'
import { UpdateInfoDto } from './dtos/update-info.dto'

/**
 * Service that deals with the `info` data.
 */
@Injectable()
export class InfoService extends TypeOrmCrudService<InfoEntity> {
  constructor(
    @InjectRepository(InfoEntity)
    private readonly repository: Repository<InfoEntity>,
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
    dto: CreateInfoDto,
  ): Promise<InfoEntity> {
    return this.repository.save(new InfoEntity(dto))
  }

  /**
   * Method that searches for default entity.
   *
   * @returns an object that represents the found entity.
   */
  async getDefault(): Promise<InfoEntity> {
    const info = await this.repository.findOne({
      where: {
        isActive: true,
      },
    })

    if (!info) {
      throw new NotFoundException('There is no info entity')
    }

    return info
  }

  /**
   * Method that searches for one entity based on it id.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @returns an object that represents the found entity.
   */
  async getOne(crudRequest: CrudRequest): Promise<InfoEntity> {
    const id = this.getParamFilters(crudRequest.parsed).id

    const info = await super.getOne(crudRequest).catch(() => undefined)
    if (!info) {
      throw new EntityNotFoundException(id, InfoEntity)
    }

    return info
  }

  /**
   * Method that searches for several entities.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @returns an object that represents all the the found entities.
   */
  async getMany(
    crudRequest: CrudRequest,
  ): Promise<PageDto<InfoEntity> | InfoEntity[]> {
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
    dto: UpdateInfoDto,
  ): Promise<InfoEntity> {
    const id = this.getParamFilters(crudRequest.parsed).id

    const info = await super.getOne(crudRequest).catch(() => undefined)
    if (!info) {
      throw new EntityNotFoundException(id, InfoEntity)
    }

    await this.repository.update(id, dto)
    await info.reload()

    return info
  }

  /**
   * Method that deletes some entity.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @returns an object that represents the deleted entity.
   */
  async deleteOne(crudRequest: CrudRequest): Promise<InfoEntity> {
    const id = this.getParamFilters(crudRequest.parsed).id

    const info = await super.getOne(crudRequest).catch(() => undefined)
    if (!info) {
      throw new EntityNotFoundException(id, InfoEntity)
    }

    await this.repository.delete(id)

    return info
  }

  /**
   * Method that disables some entity.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @returns an object that represents the disabled entity.
   */
  async disableOne(crudRequest: CrudRequest): Promise<InfoEntity> {
    const id = this.getParamFilters(crudRequest.parsed).id

    const info = await super.getOne(crudRequest).catch(() => undefined)
    if (!info) {
      throw new EntityNotFoundException(id, InfoEntity)
    }

    if (!info.isActive) {
      throw new EntityAlreadyDisabledException(id, InfoEntity)
    }

    await this.repository.update(id, {
      isActive: false,
    })
    await info.reload()

    return info
  }

  /**
   * Method that enables some entity.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @returns an object that represents the enabled entity.
   */
  async enableOne(crudRequest: CrudRequest): Promise<InfoEntity> {
    const id = this.getParamFilters(crudRequest.parsed).id

    const info = await super.getOne(crudRequest).catch(() => undefined)
    if (!info) {
      throw new EntityNotFoundException(id, InfoEntity)
    }

    if (info.isActive) {
      throw new EntityAlreadyEnabledException(id, InfoEntity)
    }

    await this.repository.update(id, {
      isActive: true,
    })
    await info.reload()

    return info
  }
}
