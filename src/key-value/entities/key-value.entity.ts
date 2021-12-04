import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity } from 'typeorm'

import { BaseEntity } from '../../common/models/base.entity'

@Entity('key_value')
export class KeyValueEntity extends BaseEntity {
  @ApiProperty()
  @Column({
    nullable: false,
    type: 'varchar',
    length: 32,
  })
  key: string

  @ApiProperty()
  @Column({
    nullable: true,
    type: 'text',
  })
  value: string

  constructor(partial: Partial<KeyValueEntity>) {
    super()
    Object.assign(this, partial)
  }
}
