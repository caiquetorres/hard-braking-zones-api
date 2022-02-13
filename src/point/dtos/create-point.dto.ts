import { ApiProperty } from '@nestjs/swagger'

import { IsDefined, IsNumber, IsString } from 'class-validator'

/**
 * Dto that represents the data sent to the backend to perform the create.
 */
export class CreatePointDto {
  @ApiProperty()
  @IsDefined({ message: 'It is required to send the timestamp' })
  @IsNumber({}, { message: 'It is required to send a valid timestamp' })
  timestamp: number

  @ApiProperty()
  @IsDefined({ message: 'It is required to send the deviceId' })
  @IsString({ message: 'It is required to send a valid string' })
  deviceId: string

  @ApiProperty()
  @IsDefined({ message: 'It is required to send the speed' })
  @IsNumber(
    { maxDecimalPlaces: 4 },
    { message: 'It is required to send a valid number' },
  )
  speed: number

  @ApiProperty()
  @IsDefined({ message: 'It is required to send the accuracy' })
  @IsNumber(
    { maxDecimalPlaces: 4 },
    { message: 'It is required to send a valid number' },
  )
  accuracy: number

  @ApiProperty()
  @IsDefined({ message: 'It is required to send the longitude' })
  @IsString({ message: 'It is required to send a valid string' })
  longitude: string

  @ApiProperty()
  @IsDefined({ message: 'It is required to send the latitude' })
  @IsString({ message: 'It is required to send a valid string' })
  latitude: string
}
