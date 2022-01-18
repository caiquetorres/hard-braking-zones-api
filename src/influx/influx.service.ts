import { HttpService } from '@nestjs/axios'
import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common'

import { EnvService } from '../env/env.service'

import { InfluxOptionsConstant } from './constants/module.constant'
import { IInfluxModuleOptions } from './interfaces/influx-module-options.interface'
import { InfluxDB, Point } from '@influxdata/influxdb-client'
import { interval, lastValueFrom } from 'rxjs'

interface Timestamp {
  timestamp: number
}

/**
 * Service that deals with the InfluxDB connection, writing and querying
 * behaviours.
 */
@Injectable()
export class InfluxService {
  /**
   * Property that defines an object that represents the influx client.
   */
  private readonly influx: InfluxDB

  /**
   * Property that defines an object that represents the logger instance
   * used to log strings or objects related with this service.
   */
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

  /**
   * Method that saves a new point in the influx database.
   *
   * @param value defines the new point data.
   * @returns an observable related to the created point.
   */
  async createOne<T extends Timestamp>(value: T): Promise<void> {
    const writeApi = this.influx.getWriteApi(
      this.envService.get('INFLUXDB_ORG'),
      this.envService.get('INFLUXDB_BUCKET'),
    )
    writeApi.writePoint(this.createPoint(value))
    await writeApi.close()
  }

  /**
   * Method that saves several new points in the influx database.
   *
   * @param values defines an array of objects that represents the new
   * point datas.
   */
  async createMany<T extends Timestamp>(values: T[]): Promise<void> {
    const writeApi = this.influx.getWriteApi(
      this.envService.get('INFLUXDB_ORG'),
      this.envService.get('INFLUXDB_BUCKET'),
    )
    writeApi.writePoints(values.map((point) => this.createPoint(point)))
    await writeApi.close()
  }

  /**
   * Method that query for data in the influx database.
   *
   * @param query defines a string the represents the `Flux Query`
   * @returns an observable related to the found data.
   */
  async query<T>(query: string): Promise<T[]> {
    return this.influx
      .getQueryApi(this.envService.get('INFLUXDB_ORG'))
      .collectRows<T>(query)
  }

  /**
   * Method that pings the influx database to test it connection
   *
   * @returns an observable related to the ping result.
   */
  private async ping(): Promise<void> {
    try {
      await lastValueFrom(
        this.httpService.get<void>(this.envService.get('INFLUXDB_URL')),
      )
    } catch (err) {
      this.logger.error('Unable to connect to the Influx database', err)
      await lastValueFrom(interval(2000))
      this.ping()
      throw err
    }
  }

  /**
   * Method that creates a new point in the influx database.
   *
   * @param value defines the new poisnt data.
   * @returns the created point.
   */
  private createPoint<T extends Timestamp>(value: T): Point {
    const point = new Point(this.envService.get('INFLUXDB_MEASUREMENT_NAME'))

    const { timestamp, ...rest } = value
    point.timestamp(new Date(timestamp))

    for (const key in rest) {
      switch (typeof rest[key]) {
        case 'boolean':
          point.booleanField(key, rest[key])
          break
        case 'number':
          point.floatField(key, rest[key])
          break
        case 'string':
          point.stringField(key, rest[key])
          break
        default:
          throw new BadRequestException('Data type not valid.')
      }
    }
    return point
  }
}
