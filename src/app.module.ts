import { HttpModule } from '@nestjs/axios'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerModule } from '@nestjs/throttler'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RateLimitGuard } from './common/guards/rate-limit/rate-limit.guard'

import { HttpConfigService } from './common/config/http/http-config.service'
import { InfluxConfigService } from './common/config/influx/influx-config.service'
import { ThrottlerConfigService } from './common/config/throttler/throttler-config.service'
import { TypeOrmConfigService } from './common/config/typeorm/typeorm-config.service'

import { AuthModule } from './auth/auth.module'
import { PathLoggerMiddleware } from './common/middlewares/path-logger/path-logger.middleware'
import { EnvModule } from './env/env.module'
import { FeedbackModule } from './feedback/feedback.module'
import { InfluxModule } from './influx/influx.module'
import { InfoModule } from './info/info.module'
import { KeyValueModule } from './key-value/key-value.module'
import { PasswordModule } from './password/password.module'
import { PermissionModule } from './permission/permission.module'
import { SpeedModule } from './speed/speed.module'
import { UserModule } from './user/user.module'
import { VersionModule } from './version/version.module'

@Module({
  imports: [
    PasswordModule,
    KeyValueModule,
    AuthModule,
    PermissionModule,
    UserModule,
    SpeedModule,
    FeedbackModule,
    InfoModule,
    VersionModule,
    EnvModule.forRoot({
      envFilePath: ['.env'],
    }),
    ThrottlerModule.forRootAsync({
      useClass: ThrottlerConfigService,
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
  providers: [
    {
      provide: APP_GUARD,
      useClass: RateLimitGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(PathLoggerMiddleware).forRoutes('*')
  }
}
