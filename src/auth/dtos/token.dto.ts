import { ApiProperty } from '@nestjsx/crud/lib/crud'

/**
 * Dto that represents the data sent from the backend to represent the token.
 */
export class TokenDto {
  @ApiProperty()
  token: string

  @ApiProperty()
  expiresIn: string
}
