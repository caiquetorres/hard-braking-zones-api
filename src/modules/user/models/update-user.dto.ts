import { IsOptional, IsString, MaxLength } from 'class-validator'

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'It is required to send a valid string' })
  @MaxLength(64, { message: 'The name should not excede 64 characters' })
  name: string
}
