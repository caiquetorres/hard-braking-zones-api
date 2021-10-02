import { HttpModuleOptionsFactory, Injectable } from '@nestjs/common'

import { EnvService } from '../../modules/env/services/env.service'

import { AxiosRequestConfig } from 'axios'

/**
 * Service deals with the http configuration.
 */
@Injectable()
export class HttpConfigService implements HttpModuleOptionsFactory {
  constructor(private readonly envService: EnvService) {}

  /**
   * Method that creates a new configuration for the http.
   *
   * @returns the created http configuration object.
   */
  createHttpOptions(): AxiosRequestConfig {
    return {
      timeout: this.envService.get('HTTP_TIMEOUT'),
    }
  }
}
