import { Inject, Injectable, Logger } from '@nestjs/common'

import { InfluxOptionsConstant } from '../constants/module.constant'
import { IInfluxModuleOptions } from '../interfaces/influx-module-options.interface'
import { InfluxDB } from 'influx'

@Injectable()
export class InfluxService {
  private readonly influx: InfluxDB
  private readonly logger = new Logger('Influx')

  constructor(
    @Inject(InfluxOptionsConstant)
    influxModuleOptions: IInfluxModuleOptions,
  ) {
    this.influx = new InfluxDB(influxModuleOptions)
    this.ping()
  }

  async ping(): Promise<void> {
    const hosts = await this.influx.ping(2000)
    for (const host of hosts) {
      if (host.online) {
        return
      }
      this.logger.error('Unable to connect to the database')
      await this.sleep(2000)
      this.ping()
    }
  }

  async createOne<T>(value: T): Promise<T> {
    this.influx.writePoints([
      {
        fields: {
          ...value,
        },
      },
    ])
    return
  }

  async createMany<T>(values: T[]): Promise<T[]> {
    const response = values.map((value) => this.createOne(value))
    return Promise.all(response)
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
