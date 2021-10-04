import { ConfigModuleOptions } from '@nestjs/config'

/**
 * Type that represent the object that should be passed when setting up
 * the environment.
 */
export type IEnvModuleOptions = Omit<ConfigModuleOptions, 'isGlobal'>
