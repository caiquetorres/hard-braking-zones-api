import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ThrottlerGuard } from '@nestjs/throttler'

/**
 * Guard responsible for protecting routes brute-force attacks.
 */
@Injectable()
export class RateLimitGuard extends ThrottlerGuard {
  throwThrottlingException(): void {
    throw new HttpException('Too many requests', HttpStatus.TOO_MANY_REQUESTS)
  }
}
