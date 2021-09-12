import { Inject, Injectable, Logger } from '@nestjs/common'

import { InfluxOptionsConstant } from '../constants/module.constant'
import { IInfluxModuleOptions } from '../interfaces/influx-module-options.interface'
import { InfluxDB } from 'influx'

@Injectable()
export class InfluxService {
  private readonly influx: InfluxDB
  private readonly logger = new Logger(InfluxService.name)

  constructor(
    @Inject(InfluxOptionsConstant)
    influxModuleOptions: IInfluxModuleOptions,
  ) {
    this.influx = new InfluxDB(influxModuleOptions)
    this.ping()
  }

  async ping(): Promise<void> {
    const hosts = await this.influx.ping(2000)

    if (hosts.some((host) => host.online)) {
      return
    }

    this.logger.error('Unable to connect to the database')
    await this.sleep(2000)
    this.ping()
  }

  async createOne<T>(value: T): Promise<T> {
    await this.influx.writePoints([
      {
        measurement: 'response_time',
        tags: {
          host: 'localhost',
        },
        fields: {
          ...value,
        },
      },
    ])
    return value
  }

  async createMany<T>(values: T[]): Promise<T[]> {
    const response = values.map((value) => this.createOne(value))
    return Promise.all(response)
  }

  async getMany<T>(): Promise<T[]> {
    return await this.influx.query(`select * from "response_time"`)
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
