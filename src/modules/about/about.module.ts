import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AboutEntity } from './entities/about.entity'

import { AboutService } from './about.service'

import { AboutController } from './about.controller'

@Module({
  imports: [TypeOrmModule.forFeature([AboutEntity])],
  controllers: [AboutController],
  providers: [AboutService],
})
export class AboutModule {}
