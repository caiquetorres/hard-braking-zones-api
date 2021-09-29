/* eslint-disable @typescript-eslint/ban-types */

import { applyDecorators } from '@nestjs/common'
import { ApiQuery } from '@nestjs/swagger'

/**
 * Decorator that marks some route with all the filters and joins allowed
 * to be sent for fetching data.
 */
export function ApiQueryGetOne(): <TFunction extends Function, Y>(
  target: object | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>,
) => void {
  return applyDecorators(
    ApiQuery({
      required: false,
      name: 'fields',
      type: 'string',
      isArray: true,
      description:
        'Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#fields">Docs</a>',
    }),
    ApiQuery({
      required: false,
      name: 'join',
      type: 'string',
      isArray: true,
      description:
        'Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join">Docs</a>',
    }),
    ApiQuery({
      required: false,
      name: 'cache',
      type: 'integer',
      description:
        'Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache">Docs</a>',
    }),
  )
}
