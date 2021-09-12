import { HttpService } from '@nestjs/axios'
import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common'

import { EnvService } from '../../env/services/env.service'

import { InfluxOptionsConstant } from '../constants/module.constant'
import { IInfluxModuleOptions } from '../interfaces/influx-module-options.interface'
import { InfluxDB, Point } from '@influxdata/influxdb-client'
import {
  catchError,
  concat,
  concatAll,
  delay,
  from,
  map,
  Observable,
  of,
} from 'rxjs'

/**
 * Service that deals with the InfluxDB connection, writing and quering
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
    this.ping().subscribe()
  }

  /**
   * Method that saves a new point in the influx database.
   *
   * @param value defines the new point data.
   * @returns an observable related to the created point.
   */
  createOne<T>(value: T): Observable<void> {
    const writeApi = this.influx.getWriteApi(
      this.envService.get('INFLUXDB_ORG'),
      this.envService.get('INFLUXDB_BUCKET'),
    )
    writeApi.writePoint(this.createPoint(value))
    return from(writeApi.close())
  }

  /**
   * Method that saves several new points in the influx database.
   *
   * @param values defines an array of objects that represents the new
   * point datas.
   * @returns an observable related to the created points.
   */
  createMany<T>(values: T[]): Observable<void> {
    return concat(...values.map((value) => this.createOne(value)))
  }

  /**
   * Method that query for data in the influx database.
   *
   * @param query defines a string the represents the `Flux Query`
   * @returns an observable related to the found data.
   */
  query<T>(query: string): Observable<T[]> {
    return from(
      this.influx
        .getQueryApi(this.envService.get('INFLUXDB_ORG'))
        .collectRows<T>(query),
    )
  }

  /**
   * Method that pings the influx database to test it connection
   *
   * @returns an observable related to the ping result.
   */
  private ping(): Observable<void> {
    return this.httpService.get<void>(this.envService.get('INFLUXDB_URL')).pipe(
      map(() => void 0),
      catchError((err) => {
        this.logger.error('Unable to connect to the Influx database', err)
        return of(null).pipe(
          delay(2000),
          map(() => this.ping()),
          concatAll(),
        )
      }),
    )
  }

  /**
   * Method that creates a new point in the influx database.
   *
   * @param value defines the new poisnt data.
   * @returns the created point.
   */
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
