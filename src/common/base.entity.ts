import { ApiProperty } from '@nestjs/swagger'
import {
  BaseEntity as BaseEntityTypeOrm,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

/**
 * Abstract class that abstracts some default entity properties
 */
export abstract class BaseEntity extends BaseEntityTypeOrm {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @ApiProperty()
  @CreateDateColumn()
  public createdAt: Date

  @ApiProperty()
  @UpdateDateColumn()
  public updatedAt: Date

  @ApiProperty()
  @Column({
    type: 'boolean',
    default: true,
  })
  public isActive: boolean
}
