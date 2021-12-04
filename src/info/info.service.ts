import { Injectable } from '@nestjs/common'

import { KeyValueEntity } from '../key-value/entities/key-value.entity'

import { CreateInfoDto } from './dtos/create-info.dto'
import { UpdateInfoDto } from './dtos/update-info.dto'

import { KeyValueService } from '../key-value/key-value.service'

/**
 * Service that deals with the `info` data.
 */
@Injectable()
export class InfoService {
  private readonly infoKey = 'info'

  constructor(private readonly keyValueService: KeyValueService) {}

  /**
   * Method that creates a new entity based on the sent payload.
   *
   * @param dto defines an object that has the entity data.
   * @returns an object that represents the created entity.
   */
  async createOne(dto: CreateInfoDto): Promise<KeyValueEntity> {
    return this.keyValueService.createOne({
      key: this.infoKey,
      value: dto.text,
    })
  }

  /**
   * Method that searches for one entity based on it id.
   *
   * @returns an object that represents the found entity.
   */
  async getOne(): Promise<KeyValueEntity> {
    return this.keyValueService.getOne(this.infoKey)
  }

  /**
   * Method that updates some entity data.
   *
   * @param dto defines an object that represents the new entity data.
   * @returns an object that represents the updated entity.
   */
  async updateOne(dto: UpdateInfoDto): Promise<KeyValueEntity> {
    return this.keyValueService.updateOne(this.infoKey, {
      value: dto.text,
    })
  }

  /**
   * Method that deletes some entity.
   *
   * @returns an object that represents the deleted entity.
   */
  async deleteOne(): Promise<KeyValueEntity> {
    return this.keyValueService.deleteOne(this.infoKey)
  }
}
