import { Module } from '@nestjs/common'

import { InfoService } from './info.service'

import { InfoController } from './info.controller'

import { KeyValueModule } from '../key-value/key-value.module'

@Module({
  imports: [KeyValueModule],
  controllers: [InfoController],
  providers: [InfoService],
})
export class InfoModule {}
