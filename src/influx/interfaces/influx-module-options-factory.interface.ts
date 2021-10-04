import { IInfluxModuleOptions } from './influx-module-options.interface'

export interface IInfluxModuleOptionsFactory {
  createInfluxOptions(): IInfluxModuleOptions | Promise<IInfluxModuleOptions>
}
