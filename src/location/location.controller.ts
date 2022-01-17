import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { SkipThrottle } from '@nestjs/throttler'

import { ApiFile } from '../common/decorators/api-file/api-file.decorator'

import { FileValidationPipe } from '../common/pipes/file-validation/file-validation.pipe'

import { CreateLocationDto } from './dtos/create-location.dto'

import { LocationService } from './location.service'

/**
 * Controller that deals with routes related with the `location` data.
 */
@ApiTags('locations')
@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  /**
   * Method that saves all data obtained from the device while it was
   * without internet connection.
   *
   * @param locations defines an array of objects that each one of them
   * represent some location obtained from the device while it was without
   * internet connection.
   */
  @ApiOperation({ summary: 'Uploads a new file' })
  @ApiCreatedResponse({
    description: 'Gets the uploaded file data',
  })
  @ApiBadRequestResponse({
    description: 'Payload sent with invalid or missing properties.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiFile('file')
  @SkipThrottle()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async save(
    @UploadedFile(new FileValidationPipe(CreateLocationDto))
    locations: CreateLocationDto[],
  ): Promise<void> {
    return this.locationService.createMany(locations)
  }
}
