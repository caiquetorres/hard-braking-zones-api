import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UserEntity } from '../../user/entities/user.entity'

import { LoginDto } from '../dtos/login.dto'
import { TokenDto } from '../dtos/token.dto'

import { EnvService } from '../../env/services/env.service'
import { PasswordService } from '../../password/services/password.service'
import { UserService } from '../../user/services/user.service'

/**
 * Service that deals with all the application authentication logic.
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly envService: EnvService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly userService: UserService,
  ) {}

  /**
   * Method that creates a token for the authenticated user.
   *
   * @param user defines an object that represent the request user.
   * @returns an object that contains the user token.
   */
  async login(user: UserEntity): Promise<TokenDto> {
    const expiresIn = this.envService.get('JWT_EXPIRES_IN')
    const { id, email, name, role, isActive } = user
    const token = await this.jwtService.signAsync(
      {
        id,
        email,
        name,
        role,
        isActive,
      },
      { expiresIn },
    )
    return { token, expiresIn }
  }

  /**
   * Method that refreshes the user token.
   *
   * @param requestUser defines an object that represents the request user.
   * @returns an object that contains the user token.
   */
  async refresh(requestUser: UserEntity): Promise<TokenDto> {
    const user = await this.userService.findOne(requestUser.id)
    return await this.login(user)
  }

  /**
   * Method that validates the email and password.
   *
   * @param loginDto defines an object that contains the email and password
   * properties.
   * @returns the user if the email and password mathces.
   */
  async validateLocal(loginDto: LoginDto): Promise<UserEntity> {
    const { email, password } = loginDto
    const user = await this.userService.findOne({ email })

    if (!user) {
      throw new UnauthorizedException('The username or password are wrong')
    }

    const passwordMatches = await this.passwordService.comparePassword(
      password,
      user.password,
    )

    if (!passwordMatches) {
      throw new UnauthorizedException('The username or password are wrong')
    }

    return user
  }

  /**
   * Method that validates the user coming from the jwt token.
   *
   * @param user defines an object that represents the user coming from the
   * jwt token.
   * @returns the user if exists.
   */
  async validateJwt(user: UserEntity): Promise<UserEntity> {
    const entity = await this.userService.findOne(user.id)

    if (!entity || !entity.isActive) {
      throw new UnauthorizedException('The informed token is no longer valid')
    }

    return entity
  }
}
