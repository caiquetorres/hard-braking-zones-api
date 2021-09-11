import { IInfluxModuleOptions } from '../../modules/influx/interfaces/influx-module-options.interface'
import { IInfluxOptionsFactory } from '../../modules/influx/interfaces/influx-options-factory.interface'

export class InfluxConfigService implements IInfluxOptionsFactory {
  createInfluxOptions(): IInfluxModuleOptions {
    return {}
  }
}
