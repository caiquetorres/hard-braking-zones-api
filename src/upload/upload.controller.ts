import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

import { UploadService } from './upload.service'

/**
 * Controller that deals with routes related with the `upload` data.
 */
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  /**
   * Method that saves all data obtained from the device while it was
   * without internet connection.
   *
   * @param file defines an object that represents the `file` with the
   * data obtained from the device while it was without internet
   * connection.
   */
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async saveOfflineData(
    @UploadedFile()
    file: Express.Multer.File,
  ): Promise<void> {
    return this.uploadService.saveOfflineData(file)
  }
}
