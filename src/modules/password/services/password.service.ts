import { Injectable } from '@nestjs/common'

import * as bcryptjs from 'bcryptjs'

/**
 * Service that deals with the password encryption and comparing logic
 */
@Injectable()
export class PasswordService {
  /**
   * Method that can encrypt some password.
   *
   * @param password stores the password that will be encrypted.
   */
  public async encryptPassword(password: string): Promise<string> {
    const salt = await bcryptjs.genSalt()
    return bcryptjs.hash(password, salt)
  }

  /**
   * Method that can compare two passwords.
   *
   * @param password stores the password that the user is passing.
   * @param hashedPassword stores the hashed password in the database.
   */
  public async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcryptjs.compare(password, hashedPassword)
  }
}
