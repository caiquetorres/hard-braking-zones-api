import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { EnvVariables } from './models/env-variables.model'

/**
 * Class that represents the service that deals with the environment
 * variables.
 */
@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Method that gets some environment variable value based on the `key`.
   *
   * @param key defines the variable key.
   * @returns the variable value.
   */
  get<T extends keyof EnvVariables>(key: T): EnvVariables[T] {
    return this.configService.get<EnvVariables[T]>(key)
  }
}
