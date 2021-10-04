import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { InfoEntity } from './entities/info.entity'

import { InfoService } from './info.service'

import { InfoController } from './info.controller'

@Module({
  imports: [TypeOrmModule.forFeature([InfoEntity])],
  controllers: [InfoController],
  providers: [InfoService],
})
export class InfoModule {}
