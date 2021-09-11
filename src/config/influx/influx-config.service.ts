import { Injectable } from '@nestjs/common'

import { EnvService } from '../../modules/env/services/env.service'

import { IInfluxModuleOptions } from '../../modules/influx/interfaces/influx-module-options.interface'
import { IInfluxOptionsFactory } from '../../modules/influx/interfaces/influx-options-factory.interface'
import { FieldType } from 'influx'

@Injectable()
export class InfluxConfigService implements IInfluxOptionsFactory {
  constructor(private readonly envService: EnvService) {}

  createInfluxOptions(): IInfluxModuleOptions {
    return {
      database: this.envService.get('INFLUXDB_DB'),
      username: this.envService.get('INFLUXDB_USER'),
      password: this.envService.get('INFLUXDB_USER_PASSWORD'),
      port: this.envService.get('INFLUXDB_PORT'),
      host: this.envService.get('INFLUXDB_HOST'),
      protocol: this.envService.get('INFLUXDB_PROTOCOL') ?? 'https',
      schema: [
        {
          measurement: 'response_time',
          tags: ['host'],
          fields: {
            deviceId: FieldType.STRING,
            velocity: FieldType.FLOAT,
          },
        },
      ],
    }
  }
}
