import { BullModuleOptions, SharedBullConfigurationFactory } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'

import { EnvService } from '../../../env/env.service'

@Injectable()
export class BullConfigService implements SharedBullConfigurationFactory {
  constructor(private readonly envService: EnvService) {}

  createSharedConfiguration(): BullModuleOptions {
    const config: BullModuleOptions = {
      redis: {
        host: this.envService.get('REDIS_HOST'),
        port: this.envService.get('REDIS_PORT'),
        password: this.envService.get('REDIS_PASSWORD'),
        tls: {
          rejectUnauthorized: false,
        },
      },
    }
    return config
  }
}
