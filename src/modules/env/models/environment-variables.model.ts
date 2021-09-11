import {
  IsBoolean,
  IsDefined,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator'

/**
 * Class that represents how environment variables should be set before
 * the application starts.
 */
export class EnvironmentVariables {
  @IsDefined({ message: 'It is required to set the "NODE_ENV"' })
  @IsString({ message: 'It is required to send a valid string value' })
  @IsIn(['test', 'development', 'production'])
  NODE_ENV: string

  @IsOptional()
  @IsNumber({}, { message: 'It is required to send a number value' })
  PORT?: number

  @IsDefined({ message: 'It is required to set the "PACKAGE_VERSION"' })
  @IsString({ message: 'It is required to send a valid string value' })
  PACKAGE_VERSION: string

  //#region Database

  @IsDefined({ message: 'It is required to set the "DATABASE_TYPE"' })
  @IsString({ message: 'It is required to send a valid string value' })
  @IsIn(['mysql', 'postgres', 'sqlite'])
  DATABASE_TYPE: 'mysql' | 'postgres' | 'sqlite'

  @IsOptional()
  @IsString({ message: 'It is required to send a valid string value' })
  DATABASE_URL?: string

  @IsOptional()
  @IsString({ message: 'It is required to send a valid string value' })
  DATABASE_DATABASE?: string

  @IsOptional()
  @IsNumber({}, { message: 'It is required to send a number value' })
  DATABASE_PORT?: number

  @IsOptional()
  @IsString({ message: 'It is required to send a valid string value' })
  DATABASE_HOST?: string

  @IsOptional()
  @IsString({ message: 'It is required to send a valid string value' })
  DATABASE_USERNAME?: string

  @IsOptional()
  @IsString({ message: 'It is required to send a valid string value' })
  DATABASE_PASSWORD?: string

  @IsOptional()
  @IsBoolean({ message: 'It is required to send a boolean value' })
  DATABASE_SYNCHRONIZE?: boolean

  @IsOptional()
  @IsBoolean({ message: 'It is required to send a boolean value' })
  DATABASE_MIGRATIONS_RUN?: boolean

  @IsOptional()
  @IsBoolean({ message: 'It is required to send a boolean value' })
  DATABASE_SSL?: boolean

  //#endregion

  //#region JWT

  @IsDefined({ message: 'It is required to set the "JWT_SECRET_KEY"' })
  @IsString({ message: 'It is required to send a valid string value' })
  JWT_SECRET_KEY: string

  @IsDefined({ message: 'It is required to set the "JWT_EXPIRES_IN"' })
  @IsString({ message: 'It is required to send a valid string value' })
  JWT_EXPIRES_IN: string

  //#endregion

  //#region Sentry

  @IsDefined({ message: 'It is required to set the "SENTRY_DSN"' })
  @IsString({ message: 'It is required to send a valid string value' })
  @IsUrl({}, { message: 'It is required to send a valid url value' })
  SENTRY_DSN: string

  //#endregion
}
