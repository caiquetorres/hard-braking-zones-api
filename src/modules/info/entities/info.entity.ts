import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity } from 'typeorm'

import { BaseEntity } from '../../../shared/base.entity'

@Entity('info')
export class InfoEntity extends BaseEntity {
  @ApiProperty()
  @Column({
    type: 'text',
    nullable: false,
  })
  text: string

  constructor(partial: Partial<InfoEntity>) {
    super()
    Object.assign(this, partial)
  }
}
