import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { HttpConfigService } from './config/http/http-config.service'
import { InfluxConfigService } from './config/influx/influx-config.service'

import { EnvModule } from './modules/env/env.module'
import { InfluxModule } from './modules/influx/influx.module'
import { VelocityModule } from './modules/velocity/velocity.module'

@Module({
  imports: [
    VelocityModule,
    EnvModule.forRoot({
      envFilePath: ['.env'],
    }),
    HttpModule.registerAsync({
      useClass: HttpConfigService,
    }),
    InfluxModule.forRootAsync({
      useClass: InfluxConfigService,
    }),
  ],
})
export class AppModule {}
