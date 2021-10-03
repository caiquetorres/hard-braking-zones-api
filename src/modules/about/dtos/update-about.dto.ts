import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateAboutDto {
  @ApiPropertyOptional()
  text?: string
}
