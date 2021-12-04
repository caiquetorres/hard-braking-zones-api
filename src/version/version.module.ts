import { Module } from '@nestjs/common'

import { VersionService } from './version.service'

import { VersionController } from './version.controller'

import { KeyValueModule } from '../key-value/key-value.module'

@Module({
  imports: [KeyValueModule],
  controllers: [VersionController],
  providers: [VersionService],
})
export class VersionModule {}
