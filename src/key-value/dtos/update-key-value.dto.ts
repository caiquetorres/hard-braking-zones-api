import { ApiPropertyOptional } from '@nestjs/swagger'

import { IsOptional, IsString } from 'class-validator'

export class UpdateKeyValueDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'It is required to send a valid string' })
  value: string
}
