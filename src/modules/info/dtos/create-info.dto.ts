import { ApiProperty } from '@nestjs/swagger'

export class CreateInfoDto {
  @ApiProperty()
  text: string
}
