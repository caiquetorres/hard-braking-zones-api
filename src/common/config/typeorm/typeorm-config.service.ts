import { Injectable } from '@nestjs/common'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'

import { EnvService } from '../../../env/env.service'

import * as path from 'path'

/**
 * Service deals with the typeorm configuration.
 */
@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly envService: EnvService) {}

  /**
   * Method that creates a new configuration for the typeorm.
   *
   * @returns the created typeorm configuration object.
   */
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const entitiesPath = path.resolve(process.cwd(), '**', '*.entity.js')

    switch (this.envService.get('DATABASE_TYPE')) {
      case 'sqlite':
        return {
          type: 'sqlite',
          database: this.envService.get('DATABASE_DATABASE'),
          synchronize: this.envService.get('DATABASE_SYNCHRONIZE'),
          migrationsRun: this.envService.get('DATABASE_MIGRATIONS_RUN'),
          entities: [entitiesPath],
        }
      case 'mysql':
        return {
          type: 'mysql',
          url: this.envService.get('DATABASE_URL'),
          database: this.envService.get('DATABASE_DATABASE'),
          port: this.envService.get('DATABASE_PORT'),
          host: this.envService.get('DATABASE_HOST'),
          username: this.envService.get('DATABASE_USERNAME'),
          password: this.envService.get('DATABASE_PASSWORD'),
          synchronize: this.envService.get('DATABASE_SYNCHRONIZE'),
          migrationsRun: this.envService.get('DATABASE_MIGRATIONS_RUN'),
          entities: [entitiesPath],
        }
      case 'postgres':
        return {
          type: 'postgres',
          url: this.envService.get('DATABASE_URL'),
          database: this.envService.get('DATABASE_DATABASE'),
          port: this.envService.get('DATABASE_PORT'),
          host: this.envService.get('DATABASE_HOST'),
          username: this.envService.get('DATABASE_USERNAME'),
          password: this.envService.get('DATABASE_PASSWORD'),
          synchronize: this.envService.get('DATABASE_SYNCHRONIZE'),
          migrationsRun: this.envService.get('DATABASE_MIGRATIONS_RUN'),
          entities: [entitiesPath],
          ssl: {
            rejectUnauthorized: false,
          },
        }
    }
  }
}
