/* eslint-disable @typescript-eslint/ban-types */

import { Injectable, Logger, PipeTransform, Type } from '@nestjs/common'

import { CreatePointDto } from '../../../point/dtos/create-point.dto'

import { plainToClass } from 'class-transformer'
import { validateSync } from 'class-validator'

/**
 * Pipe that transforms the file content to an array of
 * {@link CreateLocationDto}.
 */
@Injectable()
export class FileValidationPipe implements PipeTransform {
  constructor(private readonly type: Type<any>) {}

  /**
   * Method that transforms some multer file to an array of locations.
   *
   * @param value defines an object that represents the file which
   * contains the locaiton data.
   * @returns an array with all the locations extracted from the file.
   */
  transform(value: Express.Multer.File) {
    return [
      ...JSON.parse(value.buffer.toString()).map((location: any) =>
        this.validate(location),
      ),
    ] as CreatePointDto[]
  }

  /**
   * Method that validates the location data.
   *
   * @param config defines an object that contains all the location data.
   * @returns an object that represents the validated location.
   */
  private validate(config: CreatePointDto) {
    const validatedConfig = plainToClass(this.type, config, {
      enableImplicitConversion: true,
    })

    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
      whitelist: true,
    })

    if (errors.length > 0) {
      Logger.error(errors.toString())
      throw new Error(errors.toString())
    }
    return validatedConfig
  }
}
