import { Injectable } from '@nestjs/common'

import { EnvService } from '../../../env/services/env.service'

import { IInfluxModuleOptionsFactory } from '../../../influx/interfaces/influx-module-options-factory.interface'
import { IInfluxModuleOptions } from '../../../influx/interfaces/influx-module-options.interface'

/**
 * Service deals with the influx configuration.
 */
@Injectable()
export class InfluxConfigService implements IInfluxModuleOptionsFactory {
  constructor(private readonly envService: EnvService) {}

  /**
   * Method that creates a new configuration for the influx.
   *
   * @returns the created influx configuration object.
   */
  createInfluxOptions(): IInfluxModuleOptions {
    // TODO: test the influx connection in this file

    return {
      url: this.envService.get('INFLUXDB_URL'),
      token: this.envService.get('INFLUXDB_TOKEN'),
    }
  }
}
