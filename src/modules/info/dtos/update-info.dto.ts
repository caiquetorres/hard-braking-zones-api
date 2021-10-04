import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateInfoDto {
  @ApiPropertyOptional()
  text?: string
}
