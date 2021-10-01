import { ApiProperty } from '@nestjsx/crud/lib/crud'

import { IsOptional, IsString } from 'class-validator'

export class UpdateFeedbackDto {
  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'It is required to send a valid string' })
  text?: string
}
