import { GetManyDefaultResponse } from '@nestjsx/crud'

export function isGetMany<T>(
  value: GetManyDefaultResponse<T> | T[],
): value is GetManyDefaultResponse<T> {
  return !Array.isArray(value)
}
