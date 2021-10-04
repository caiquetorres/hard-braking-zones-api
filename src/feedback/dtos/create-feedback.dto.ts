import { ApiProperty } from '@nestjsx/crud/lib/crud'

import { IsDefined, IsString } from 'class-validator'

/**
 * Dto that represents the data sent to the backend to perform the create.
 */
export class CreateFeedbackDto {
  @ApiProperty()
  @IsDefined({ message: 'It is required to send the text' })
  @IsString({ message: 'It is required to send a valid string' })
  text: string
}
