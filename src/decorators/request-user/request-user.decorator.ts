import { createParamDecorator, ExecutionContext } from '@nestjs/common'

/**
 * Decorator that gets from the request the request user.
 */
export const RequestUser = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user
  },
)
