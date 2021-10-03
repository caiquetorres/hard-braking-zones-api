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
}
