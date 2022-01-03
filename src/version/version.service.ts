import { Injectable } from '@nestjs/common'

import { KeyValueEntity } from '../key-value/entities/key-value.entity'

import { CreateVersionDto } from './dtos/create-version.dto'
import { UpdateVersionDto } from './dtos/update-version.dto'

import { KeyValueService } from '../key-value/key-value.service'

@Injectable()
export class VersionService {
  /**
   * Property that defines the key that represents the `version` data.
   */
  private readonly versionKey = 'version'

  constructor(private readonly keyValueService: KeyValueService) {}

  /**
   * Method that creates a new entity based on the sent payload.
   *
   * @param dto defines an object that has the entity data.
   * @returns an object that represents the created entity.
   */
  async createOne(dto: CreateVersionDto): Promise<KeyValueEntity> {
    return this.keyValueService.createOne({
      key: this.versionKey,
      value: JSON.stringify(dto),
    })
  }

  /**
   * Method that searches for one entity based on it id.
   *
   * @returns an object that represents the found entity.
   */
  async getOne(): Promise<KeyValueEntity> {
    return this.keyValueService.getOne(this.versionKey)
  }

  /**
   * Method that updates some entity data.
   *
   * @param dto defines an object that represents the new entity data.
   * @returns an object that represents the updated entity.
   */
  async updateOne(dto: UpdateVersionDto): Promise<KeyValueEntity> {
    return this.keyValueService.updateOne(this.versionKey, {
      value: JSON.stringify(dto),
    })
  }

  /**
   * Method that deletes some entity.
   *
   * @returns an object that represents the deleted entity.
   */
  async deleteOne(): Promise<KeyValueEntity> {
    return this.keyValueService.deleteOne(this.versionKey)
  }
}
