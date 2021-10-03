import { Module } from '@nestjs/common'

import { AboutService } from './about.service'

import { AboutController } from './about.controller'

@Module({
  controllers: [AboutController],
  providers: [AboutService],
})
export class AboutModule {}
