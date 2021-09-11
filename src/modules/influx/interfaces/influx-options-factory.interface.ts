import { IInfluxModuleOptions } from './influx-module-options.interface'

export interface IInfluxOptionsFactory {
  createInfluxOptions(): IInfluxModuleOptions | Promise<IInfluxModuleOptions>
}
