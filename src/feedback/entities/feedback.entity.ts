import { ApiProperty } from '@nestjsx/crud/lib/crud'
import { Column, Entity } from 'typeorm'

import { BaseEntity } from '../../common/models/base.entity'

/**
 * Entity that represents the `feedback`.
 */
@Entity('feedback')
export class FeedbackEntity extends BaseEntity {
  @ApiProperty()
  @Column({
    nullable: false,
    type: 'text',
  })
  text: string

  constructor(partial: Partial<FeedbackEntity>) {
    super()
    Object.assign(this, partial)
  }
}
