import { Module } from '@nestjs/common'

import { InfluxConfigService } from './config/influx/influx-config.service'

import { EnvModule } from './modules/env/env.module'
import { InfluxModule } from './modules/influx/influx.module'

@Module({
  imports: [
    EnvModule.forRoot({
      envFilePath: ['.env'],
    }),
    InfluxModule.forRootAsync({
      useClass: InfluxConfigService,
    }),
  ],
})
export class AppModule {}
