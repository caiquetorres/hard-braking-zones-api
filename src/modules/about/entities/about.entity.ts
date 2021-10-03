import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity } from 'typeorm'

import { BaseEntity } from '../../../shared/base.entity'

@Entity('about')
export class AboutEntity extends BaseEntity {
  @ApiProperty()
  @Column({
    type: 'text',
    nullable: false,
  })
  text: string

  constructor(partial: Partial<AboutEntity>) {
    super()
    Object.assign(this, partial)
  }
}
