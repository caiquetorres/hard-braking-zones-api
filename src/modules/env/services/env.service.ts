import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { EnvironmentVariables } from '../models/environment-variables.model'

/**
 * Class that represents the service that deals with the environment
 * variables.
 */
@Injectable()
export class EnvService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  /**
   * Method that gets some environment variable value based on the `key`.
   *
   * @param key defines the variable key.
   * @returns the variable value.
   */
  get<T extends keyof EnvironmentVariables>(key: T): EnvironmentVariables[T] {
    return this.configService.get<EnvironmentVariables[T]>(key)
  }
}
