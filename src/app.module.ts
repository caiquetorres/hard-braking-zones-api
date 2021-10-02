import { HttpModule } from '@nestjs/axios'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerModule } from '@nestjs/throttler'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RateLimitGuard } from './guards/rate-limit/rate-limit.guard'

import { HttpConfigService } from './config/http/http-config.service'
import { InfluxConfigService } from './config/influx/influx-config.service'
import { ThrottlerConfigService } from './config/throttler/throttler-config.service'
import { TypeOrmConfigService } from './config/typeorm/typeorm-config.service'

import { PathLoggerMiddleware } from './middlewares/path-logger/path-logger.middleware'
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
