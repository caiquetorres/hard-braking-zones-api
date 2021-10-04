import { ModuleMetadata, Type } from '@nestjs/common'

import { IInfluxModuleOptionsFactory } from './influx-module-options-factory.interface'
import { IInfluxModuleOptions } from './influx-module-options.interface'

export interface IInfluxAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<IInfluxModuleOptionsFactory>
  useClass?: Type<IInfluxModuleOptionsFactory>
  useFactory?(...args: unknown[]): IInfluxModuleOptions
  inject?: Type<unknown>[]
}
