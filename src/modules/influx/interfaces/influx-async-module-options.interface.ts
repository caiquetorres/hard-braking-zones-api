import { ModuleMetadata, Type } from '@nestjs/common'

import { IInfluxModuleOptions } from './influx-module-options.interface'
import { IInfluxOptionsFactory } from './influx-options-factory.interface'

export interface IInfluxAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<IInfluxOptionsFactory>
  useClass?: Type<IInfluxOptionsFactory>
  useFactory?(...args: unknown[]): IInfluxModuleOptions
  inject?: Type<unknown>[]
}
