import { Injectable } from '@nestjs/common'
import {
  ThrottlerModuleOptions,
  ThrottlerOptionsFactory,
} from '@nestjs/throttler'

import { EnvService } from '../../../env/env.service'

/**
 * Service deals with the throttler configuration.
 */
@Injectable()
export class ThrottlerConfigService implements ThrottlerOptionsFactory {
  constructor(private readonly envService: EnvService) {}

  /**
   * Method that creates a new configuration for the throttler.
   *
   * @returns the created throttler configuration object.
   */
  createThrottlerOptions(): ThrottlerModuleOptions {
    return {
      ttl: this.envService.get('THROTTLER_TTL'),
      limit: this.envService.get('THROTTLER_LIMIT'),
    }
  }
}
