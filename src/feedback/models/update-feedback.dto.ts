import { ApiProperty } from '@nestjsx/crud/lib/crud'

import { IsOptional, IsString } from 'class-validator'

/**
 * Dto that represents the data sent to the backend to perform the update.
 */
export class UpdateFeedbackDto {
  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'It is required to send a valid string' })
  text?: string
}
