import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

/**
 * Guard responsible for protecting routes using the jwt strategy.
 */
@Injectable()
export class JwtGuard extends AuthGuard('jwt') {}
