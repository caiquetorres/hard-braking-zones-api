import { InjectQueue } from '@nestjs/bull'
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'

import { ApiFile } from '../common/decorators/api-file/api-file.decorator'

import { FileValidationPipe } from '../common/pipes/file-validation/file-validation.pipe'

import { CreateLocationDto } from './dtos/create-location.dto'

import { Queue } from 'bull'

/**
 * Controller that deals with routes related with the `location` data.
 */
@ApiTags('locations')
@Controller('locations')
export class LocationController {
  constructor(
    @InjectQueue('location')
    private readonly queue: Queue,
  ) {}
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
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async save(
    @UploadedFile(new FileValidationPipe(CreateLocationDto))
    dtos: CreateLocationDto[],
  ): Promise<void> {
    for await (const dto of dtos) {
      this.queue.add(dto)
    }
  }
}
