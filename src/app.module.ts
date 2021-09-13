import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { HttpConfigService } from './config/http/http-config.service'
import { InfluxConfigService } from './config/influx/influx-config.service'
import { TypeOrmConfigService } from './config/typeorm/typeorm-config.service'

import { EnvModule } from './modules/env/env.module'
import { InfluxModule } from './modules/influx/influx.module'
import { PasswordModule } from './modules/password/password.module'
import { VelocityModule } from './modules/velocity/velocity.module'

@Module({
  imports: [
    PasswordModule,
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
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
  ],
})
export class AppModule {}
