import { ApiProperty } from '@nestjs/swagger'

/**
 * Class that deals with the paginated response in the app.
 */
export abstract class PageDto<T> {
  @ApiProperty()
  count: number

  @ApiProperty()
  total: number

  @ApiProperty()
  page: number

  @ApiProperty()
  pageCount: number

  abstract data: T[]
}
