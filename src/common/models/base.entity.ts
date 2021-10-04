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
  id: string

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date

  @ApiProperty()
  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean
}
