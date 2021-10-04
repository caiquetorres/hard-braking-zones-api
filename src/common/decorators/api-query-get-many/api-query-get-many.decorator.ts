/* eslint-disable @typescript-eslint/ban-types */

import { applyDecorators } from '@nestjs/common'
import { ApiQuery } from '@nestjs/swagger'

/**
 * Decorator that marks some route with all the conditions, filters, sorts
 * and joins allowed to be sent for fetching data.
 */
export function ApiQueryGetMany(): <TFunction extends Function, Y>(
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
      name: 's',
      type: 'string',
      description:
        'Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search">Docs</a>',
    }),
    ApiQuery({
      required: false,
      name: 'filter',
      type: 'string',
      isArray: true,
      description:
        'Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter">Docs</a>',
    }),
    ApiQuery({
      required: false,
      name: 'or',
      type: 'string',
      isArray: true,
      description:
        'Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or">Docs</a>',
    }),
    ApiQuery({
      required: false,
      name: 'sort',
      type: 'string',
      isArray: true,
      description:
        'Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort">Docs</a>',
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
      name: 'limit',
      type: 'integer',
      description:
        'Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit">Docs</a>',
    }),
    ApiQuery({
      required: false,
      name: 'offset',
      type: 'integer',
      description:
        'Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset">Docs</a>',
    }),
    ApiQuery({
      required: false,
      name: 'page',
      type: 'integer',
      description:
        'Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page">Docs</a>',
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
