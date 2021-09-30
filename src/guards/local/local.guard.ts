import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

// TODO: Add the custom unathorized exception

/**
 * Guard responsible for protecting routes using the `local` strategy.
 */
@Injectable()
export class LocalGuard extends AuthGuard('local') {}
