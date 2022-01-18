import { BullModuleOptions, SharedBullConfigurationFactory } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'

import { EnvService } from '../../../env/env.service'

/**
 * Service deals with the `bull` configuration.
 *
 * @see The `Nestjs` docs for [Queues](https://docs.nestjs.com/techniques/queues).
 */
@Injectable()
export class BullConfigService implements SharedBullConfigurationFactory {
  constructor(private readonly envService: EnvService) {}

  /**
   * Method that creates a new configuration for the `bull`.
   *
   * @returns the created `bull` configuration object.
   */
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
