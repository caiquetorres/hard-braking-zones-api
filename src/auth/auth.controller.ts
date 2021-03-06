import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { RequestUser } from '../common/decorators/request-user/request-user.decorator'

import { JwtGuard } from '../common/guards/jwt/jwt.guard'
import { LocalGuard } from '../common/guards/local/local.guard'

import { UserEntity } from '../user/entities/user.entity'

import { LoginDto } from './dtos/login.dto'
import { TokenDto } from './dtos/token.dto'

import { AuthService } from './auth.service'

/**
 * Controller that deals with the authentication routes.
 */
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Method that is called when the user access the "/auth/local" route.
   *
   * @param requestUser stores the user data who is accessing the route.
   * @returns the token data.
   */
  @ApiOperation({ summary: 'Authenticates the user' })
  @ApiOkResponse({
    description: 'Retrieves the token value',
    type: TokenDto,
  })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated' })
  @UseGuards(LocalGuard)
  @HttpCode(200)
  @Post('local')
  async login(
    @Body()
    _loginDto: LoginDto, // for validation
    @RequestUser()
    user: UserEntity,
  ): Promise<TokenDto> {
    return this.authService.login(user)
  }

  /**
   * Method that refreshes the user token.
   *
   * @param requestUser defines an object that represents the request user.
   * @returns an object that contains the user token.
   */
  @ApiOperation({ summary: 'Refreshes the user token' })
  @ApiOkResponse({
    description: 'Retrieves the token value',
    type: TokenDto,
  })
  @UseGuards(JwtGuard)
  @ApiUnauthorizedResponse({ description: 'User is not authenticated' })
  @HttpCode(200)
  @Post('refresh')
  async refresh(
    @RequestUser()
    requestUser: UserEntity,
  ): Promise<TokenDto> {
    return this.authService.refresh(requestUser)
  }
}
