import { ApiProperty } from '@nestjs/swagger'

import { IsDefined, IsNumber, IsString } from 'class-validator'

/**
 * Dto that represents the data sent to the backend to perform the create.
 */
export class CreateVelocityDto {
  @ApiProperty()
  @IsDefined({ message: 'It is required to send the deviceId' })
  @IsString({ message: 'It is required to send a valid string' })
  deviceId: string

  @ApiProperty()
  @IsDefined({ message: 'It is required to send the latitude' })
  @IsNumber(
    { maxDecimalPlaces: 4 },
    { message: 'It is required to send a valid number' },
  )
  velocity: string

  @ApiProperty()
  @IsDefined({ message: 'It is required to send the longitude' })
  @IsString({ message: 'It is required to send a valid string' })
  longitude: string

  @ApiProperty()
  @IsDefined({ message: 'It is required to send the latitude' })
  @IsString({ message: 'It is required to send a valid string' })
  latitude: string
}
