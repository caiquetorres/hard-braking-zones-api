import { PageDto } from '../models/page.dto'

export function isPge<T>(value: PageDto<T> | T[]): value is PageDto<T> {
  return !Array.isArray(value)
}
