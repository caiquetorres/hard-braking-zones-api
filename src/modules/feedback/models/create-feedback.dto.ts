import { ApiProperty } from '@nestjsx/crud/lib/crud'

import { IsDefined, IsString } from 'class-validator'

export class CreateFeedbackDto {
  @ApiProperty()
  @IsDefined({ message: 'It is required to send the text' })
  @IsString({ message: 'It is required to send a valid string' })
  text: string
}
