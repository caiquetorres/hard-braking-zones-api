import { ApiProperty } from '@nestjsx/crud/lib/crud'

import { IsDefined, IsEmail, IsString } from 'class-validator'

/**
 * Dto that represents the data sent to the backend to perform the login.
 */
export class LoginDto {
  @ApiProperty()
  @IsDefined({ message: 'It is required to send the email' })
  @IsString({ message: 'It is required to send a valid string' })
  @IsEmail({}, { message: 'It is requried to send a valid email' })
  email: string

  @ApiProperty()
  @IsDefined({ message: 'It is required to send the password' })
  @IsString({ message: 'It is required to send a valid string' })
  password: string
}
