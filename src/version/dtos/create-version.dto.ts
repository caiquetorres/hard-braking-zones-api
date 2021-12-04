import { ApiProperty } from '@nestjs/swagger'

import { IsDefined, IsString, MaxLength } from 'class-validator'

export class CreateVersionDto {
  @ApiProperty()
  @IsDefined({ message: 'It is required to send the version' })
  @IsString({ message: 'It is required to send a valid string' })
  @MaxLength(16, { message: 'The name should not excede 16 characters' })
  version: string

  @ApiProperty()
  @IsDefined({ message: 'It is required to send the url' })
  @IsString({ message: 'It is required to send a valid string' })
  url: string
}
