import { HttpService } from '@nestjs/axios'
import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common'

import { EnvService } from '../../env/services/env.service'

import { InfluxOptionsConstant } from '../constants/module.constant'
import { IInfluxModuleOptions } from '../interfaces/influx-module-options.interface'
import { InfluxDB, Point } from '@influxdata/influxdb-client'
import { lastValueFrom } from 'rxjs'

@Injectable()
export class InfluxService {
  private readonly influx: InfluxDB
  private readonly logger = new Logger(InfluxService.name)

  constructor(
    @Inject(InfluxOptionsConstant)
    influxModuleOptions: IInfluxModuleOptions,
    private readonly httpService: HttpService,
    private readonly envService: EnvService,
  ) {
    this.influx = new InfluxDB(influxModuleOptions)
    this.ping()
  }

  async createOne<T>(value: T): Promise<void> {
    const writeApi = this.influx.getWriteApi(
      this.envService.get('INFLUXDB_ORG'),
      this.envService.get('INFLUXDB_BUCKET'),
    )

    writeApi.writePoint(this.createPoint(value))

    await writeApi.close()
  }

  async createMany<T>(values: T[]): Promise<void> {
    const response = values.map((value) => this.createOne(value))
    await Promise.all(response)
  }

  async query<T>(query: string): Promise<T[]> {
    return this.influx
      .getQueryApi(this.envService.get('INFLUXDB_ORG'))
      .collectRows<T>(query)
  }

  private async ping(): Promise<void> {
    try {
      await lastValueFrom(
        this.httpService.get<void>(this.envService.get('INFLUXDB_URL')),
      )
    } catch (err) {
      this.logger.error('Unable to connect to the database')
      await this.sleep(2000)
      this.ping()
    }
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  private createPoint(value: any): Point {
    const point = new Point(this.envService.get('INFLUXDB_MEASUREMENT_NAME'))
    for (const key in value) {
      if (typeof value[key] === 'boolean') {
        point.booleanField(key, value[key])
      } else if (typeof value[key] === 'number') {
        point.floatField(key, value[key])
      } else if (typeof value[key] === 'string') {
        point.stringField(key, value[key])
      } else {
        throw new BadRequestException('Data type no valid.')
      }
    }
    return point
  }
}
