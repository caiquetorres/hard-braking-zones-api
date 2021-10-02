import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ThrottlerGuard } from '@nestjs/throttler'

/**
 * Guard responsible for protecting routes brute-force attacks.
 */
@Injectable()
export class RateLimitGuard extends ThrottlerGuard {
  /**
   * Method that throws the default exception for `too-many-requests`.
   */
  throwThrottlingException(): void {
    throw new HttpException('Too many requests', HttpStatus.TOO_MANY_REQUESTS)
  }
}
