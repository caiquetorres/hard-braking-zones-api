import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { HttpConfigService } from './config/http/http-config.service'
import { InfluxConfigService } from './config/influx/influx-config.service'
import { TypeOrmConfigService } from './config/typeorm/typeorm-config.service'

import { AuthModule } from './modules/auth/auth.module'
import { EnvModule } from './modules/env/env.module'
import { FeedbackModule } from './modules/feedback/feedback.module'
import { InfluxModule } from './modules/influx/influx.module'
import { PasswordModule } from './modules/password/password.module'
import { PermissionModule } from './modules/permission/permission.module'
import { UserModule } from './modules/user/user.module'
import { VelocityModule } from './modules/velocity/velocity.module'

@Module({
  imports: [
    PasswordModule,
    AuthModule,
    PermissionModule,
    UserModule,
    VelocityModule,
    FeedbackModule,
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
