import { ApiBody } from '@nestjs/swagger'

/**
 * Decorator that marks some route allowing to send files to it.
 *
 * @param fileName defines the name that the file will be sent with.
 */
export const ApiFile =
  (fileName = 'file'): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [fileName]: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })(target, propertyKey, descriptor)
  }
