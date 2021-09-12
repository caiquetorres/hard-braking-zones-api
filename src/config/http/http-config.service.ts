import { HttpModuleOptionsFactory, Injectable } from '@nestjs/common'

import { EnvService } from '../../modules/env/services/env.service'

import { AxiosRequestConfig } from 'axios'

@Injectable()
export class HttpConfigService implements HttpModuleOptionsFactory {
  constructor(private readonly envService: EnvService) {}

  createHttpOptions(): AxiosRequestConfig {
    return {
      timeout: this.envService.get('HTTP_TIMEOUT'),
    }
  }
}
