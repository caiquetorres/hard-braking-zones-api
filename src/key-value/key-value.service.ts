import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { EntityAlreadyDisabledException } from '../common/exceptions/conflict/entity-already-disabled.exception'
import { EntityNotFoundException } from '../common/exceptions/not-found/entity-not-found.exception'

import { KeyValueEntity } from './entities/key-value.entity'

import { CreateKeyValueDto } from './dtos/create-key-value.dto'
import { UpdateKeyValueDto } from './dtos/update-key-value.dto'

@Injectable()
export class KeyValueService {
  constructor(
    @InjectRepository(KeyValueEntity)
    private readonly repository: Repository<KeyValueEntity>,
  ) {}

  /**
   * Method that creates a new entity based on the sent payload.
   *
   * @param dto defines an object that has the entity data.
   * @returns an object that represents the created entity.
   */
  async createOne(dto: CreateKeyValueDto): Promise<KeyValueEntity> {
    const keyValue = new KeyValueEntity(dto)

    const hasKeyValueWithKey = await this.repository.findOne({ key: dto.key })
    if (hasKeyValueWithKey) {
      throw new ConflictException(
        'An key-value with this key was already registered',
      )
    }

    return this.repository.save(keyValue)
  }

  /**
   * Method that searches for one entity based on it id.
   *
   * @param key defines the unique identifier
   * @returns an object that represents the found entity.
   */
  async getOne(key: string): Promise<KeyValueEntity> {
    const keyValue = await this.repository.findOne({ key })

    if (!keyValue) {
      throw new EntityNotFoundException(key, KeyValueEntity)
    }

    return keyValue
  }

  /**
   * Method that updates some entity data.
   *
   * @param key defines the unique identifier
   * @param dto defines an object that represents the new entity data.
   * @returns an object that represents the updated entity.
   */
  async updateOne(
    key: string,
    dto: UpdateKeyValueDto,
  ): Promise<KeyValueEntity> {
    const keyValue = await this.repository.findOne({ key })

    if (!keyValue) {
      throw new EntityNotFoundException(key, KeyValueEntity)
    }

    await this.repository.update({ key }, dto)
    await keyValue.reload()

    return keyValue
  }

  /**
   * Method that deletes some entity.
   *
   * @param key defines the unique identifier
   * @returns an object that represents the deleted entity.
   */
  async deleteOne(key: string): Promise<KeyValueEntity> {
    const keyValue = await this.repository.findOne({ key })

    if (!keyValue) {
      throw new EntityNotFoundException(key, KeyValueEntity)
    }

    await this.repository.delete({ key })

    return keyValue
  }

  /**
   * Method that disables some entity.
   *
   * @param key defines the unique identifier
   * @returns an object that represents the disabled entity.
   */
  async disableOne(key: string): Promise<KeyValueEntity> {
    const keyValue = await this.repository.findOne({ key })

    if (!keyValue) {
      throw new EntityNotFoundException(key, KeyValueEntity)
    }

    await this.repository.update({ key }, { isActive: false })

    if (!keyValue.isActive) {
      throw new EntityAlreadyDisabledException(key, KeyValueEntity)
    }

    await keyValue.reload()

    return keyValue
  }

  /**
   * Method that enables some entity.
   *
   * @param key defines the unique identifier
   * @returns an object that represents the enabled entity.
   */
  async enableOne(key: string): Promise<KeyValueEntity> {
    const keyValue = await this.repository.findOne({ key })

    if (!keyValue) {
      throw new EntityNotFoundException(key, KeyValueEntity)
    }

    await this.repository.update({ key }, { isActive: true })

    if (!keyValue.isActive) {
      throw new EntityAlreadyDisabledException(key, KeyValueEntity)
    }

    await keyValue.reload()

    return keyValue
  }
}
