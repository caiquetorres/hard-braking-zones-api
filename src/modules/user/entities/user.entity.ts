import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity } from 'typeorm'

import { BaseEntity } from '../../../common/base.entity'

import { Exclude, Expose, Transform } from 'class-transformer'

@Entity('user')
export class UserEntity extends BaseEntity {
  @ApiProperty()
  @Column({
    nullable: false,
    type: 'varchar',
    length: 64,
  })
  name: string

  @ApiProperty()
  @Column({
    nullable: false,
    type: 'varchar',
    length: 64,
  })
  email: string

  @Exclude()
  @Column({
    nullable: false,
    type: 'text',
  })
  password: string

  @ApiProperty({
    name: 'permissions',
    type: 'string',
    isArray: true,
  })
  @Expose({ name: 'permissions' })
  @Transform((params) => params.value.split('|'))
  @Column({
    nullable: false,
    type: 'varchar',
    length: 32,
  })
  role: string

  constructor(partial: Partial<UserEntity>) {
    super()
    Object.assign(this, partial)
  }
}
