import { ApiProperty } from '@nestjsx/crud/lib/crud'

export class TokenDto {
  @ApiProperty()
  token: string

  @ApiProperty()
  expiresIn: string
}
