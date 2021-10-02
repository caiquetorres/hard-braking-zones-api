import { ApiProperty } from '@nestjs/swagger'

/**
 * Class that deals with the paginated response in the app.
 */
export abstract class BaseGetManyDefaultResponseDto {
  @ApiProperty()
  count: number

  @ApiProperty()
  total: number

  @ApiProperty()
  page: number

  @ApiProperty()
  pageCount: number

  abstract data: unknown[]
}
