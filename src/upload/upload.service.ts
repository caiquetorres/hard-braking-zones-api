import { Injectable, Logger } from '@nestjs/common'

/**
 * Service that deals with the `upload` data.
 */
@Injectable()
export class UploadService {
  /**
   * Method that saves all data obtained from the device while it was
   * without internet connection.
   *
   * @param file defines an object that represents the `file` with the
   * data obtained from the device while it was without internet
   * connection.
   */
  async saveOfflineData(file: Express.Multer.File): Promise<void> {
    Logger.debug(file.buffer.toString())
  }
}
