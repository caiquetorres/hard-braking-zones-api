import { ApiProperty } from '@nestjs/swagger'

import { IsDefined, IsString, MaxLength } from 'class-validator'

export class CreateKeyValueDto {
  @ApiProperty()
  @IsDefined({ message: 'It is required to send the key' })
  @IsString({ message: 'It is required to send a valid string' })
  @MaxLength(32, { message: 'The name should not excede 32 characters' })
  key: string

  @ApiProperty()
  @IsDefined({ message: 'It is required to send the value' })
  @IsString({ message: 'It is required to send a valid string' })
  value: string
}
