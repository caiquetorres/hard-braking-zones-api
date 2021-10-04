import { ApiProperty } from '@nestjs/swagger'

import { IsDefined, IsString } from 'class-validator'

export class CreateInfoDto {
  @ApiProperty()
  @IsDefined({ message: 'It is required to send the text' })
  @IsString({ message: 'It is required to send a valid string' })
  text: string
}
