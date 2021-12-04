import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { KeyValueEntity } from './entities/key-value.entity'

import { KeyValueService } from './key-value.service'

@Module({
  imports: [TypeOrmModule.forFeature([KeyValueEntity])],
  providers: [KeyValueService],
  exports: [KeyValueService],
})
export class KeyValueModule {}
