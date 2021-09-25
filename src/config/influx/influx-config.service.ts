import { Injectable } from '@nestjs/common'

import { EnvService } from '../../modules/env/services/env.service'

import { IInfluxModuleOptionsFactory } from '../../modules/influx/interfaces/influx-module-options-factory.interface'
import { IInfluxModuleOptions } from '../../modules/influx/interfaces/influx-module-options.interface'

@Injectable()
export class InfluxConfigService implements IInfluxModuleOptionsFactory {
  constructor(private readonly envService: EnvService) {}

  createInfluxOptions(): IInfluxModuleOptions {
    // TODO: test the influx connection in this file

    return {
      url: this.envService.get('INFLUXDB_URL'),
      token: this.envService.get('INFLUXDB_TOKEN'),
    }
  }
}
