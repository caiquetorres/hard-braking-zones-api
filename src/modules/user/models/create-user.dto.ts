import { ApiProperty } from '@nestjs/swagger'

import { IsDefined, IsString, MaxLength } from 'class-validator'

export class CreateUserDto {
  @ApiProperty()
  @IsDefined({ message: 'It is required to send the name' })
  @IsString({ message: 'It is required to send a valid string' })
  @MaxLength(64, { message: 'The name should not excede 64 characters' })
  name: string

  @ApiProperty()
  @IsDefined({ message: 'It is required to send the email' })
  @IsString({ message: 'It is required to send a valid string' })
  @MaxLength(64, { message: 'The email should not excede 64 characters' })
  email: string

  @ApiProperty()
  @IsDefined({ message: 'It is required to send the password' })
  @IsString({ message: 'It is required to send a valid string' })
  password: string
}
