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

import { CreatePointDto } from './dtos/create-point.dto'

import { PointService } from './point.service'

/**
 * Controller that deals with routes related with the `point` data.
 */
@ApiTags('points')
@Controller('points')
export class PointController {
  constructor(private readonly pointService: PointService) {}

  /**
   * Method that saves all data obtained from the device while it was
   * without internet connection.
   *
   * @param points defines an array of objects that each one of them
   * represent some point obtained from the device while it was without
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
    @UploadedFile(new FileValidationPipe(CreatePointDto))
    dtos: CreatePointDto[],
  ): Promise<void> {
    await this.pointService.createMany(dtos)
  }
}
