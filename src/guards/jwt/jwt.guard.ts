import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

/**
 * Guard responsible for protecting routes using the jwt strategy.
 */
@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  /**
   * Method that handles the request and deals with the user and error data.
   *
   * @param error defines an object that represents the error.
   * @param user defines an object that represents the logged user.
   * @returns an object that represents the logged user.
   */
  public handleRequest<T>(error: Error, user: T): T {
    if (error || !user) {
      throw new UnauthorizedException('The username or password are wrong')
    }

    return user
  }
}
