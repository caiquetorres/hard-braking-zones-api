import { Column, Entity } from 'typeorm'

import { BaseEntity } from '../../../common/base.entity'

import { Exclude, Expose } from 'class-transformer'

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({
    nullable: false,
    type: 'varchar',
    length: 64,
  })
  name: string

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

  @Expose({
    name: 'permissions',
  })
  @Column({
    nullable: false,
    type: 'varchar',
    length: 32,
  })
  roles: string

  constructor(partial: Partial<UserEntity>) {
    super()
    Object.assign(this, partial)
  }
}
