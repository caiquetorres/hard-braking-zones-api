import { DynamicModule, Global, Module, Provider } from '@nestjs/common'

import { InfluxService } from './services/influx.service'

import { InfluxOptionsConstant } from './constants/module.constant'
import { IInfluxAsyncOptions as IInfluxAsyncModuleOptions } from './interfaces/influx-async-module-options.interface'
import { IInfluxModuleOptions } from './interfaces/influx-module-options.interface'
import { IInfluxOptionsFactory } from './interfaces/influx-options-factory.interface'

@Global()
@Module({})
export class InfluxModule {
  static forRoot(options?: IInfluxModuleOptions): DynamicModule {
    return {
      module: InfluxModule,
      providers: [InfluxService, ...this.createInfluxOptionsProvider(options)],
      exports: [InfluxService],
    }
  }

  static forRootAsync(options?: IInfluxAsyncModuleOptions): DynamicModule {
    return {
      module: InfluxModule,
      providers: [
        InfluxService,
        ...this.createInfluxAsyncOptionsProvider(options),
      ],
      exports: [InfluxService],
    }
  }

  private static createInfluxOptionsProvider(
    options?: IInfluxModuleOptions,
  ): Provider[] {
    return [
      {
        provide: InfluxOptionsConstant,
        useValue: options,
      },
    ]
  }

  private static createInfluxAsyncOptionsProvider(
    options?: IInfluxAsyncModuleOptions,
  ): Provider[] {
    if (options.useFactory) {
      return [
        {
          provide: InfluxOptionsConstant,
          useFactory: options.useFactory,
          inject: options.inject,
        },
      ]
    } else {
      const useClass = options.useClass
      return [
        {
          provide: InfluxOptionsConstant,
          useFactory: async (
            optionsFactory: IInfluxOptionsFactory,
          ): Promise<IInfluxModuleOptions> =>
            optionsFactory.createInfluxOptions(),
          inject: [options.useExisting || options.useClass],
        },
        useClass && {
          provide: useClass,
          useClass: useClass,
        },
      ]
    }
  }
}
