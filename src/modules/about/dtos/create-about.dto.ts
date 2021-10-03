import { ApiProperty } from '@nestjs/swagger'

export class CreateAboutDto {
  @ApiProperty()
  text: string
}
