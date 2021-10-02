import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

/**
 * Guard responsible for protecting routes using the `local` strategy.
 */
@Injectable()
export class LocalGuard extends AuthGuard('local') {}
