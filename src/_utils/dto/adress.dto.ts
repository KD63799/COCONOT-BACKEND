import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddressDto {
  @ApiProperty()
  @IsString()
  addressStreet: string;

  @ApiProperty()
  @IsString()
  postalCode: string;

  @ApiProperty()
  @IsString()
  city: string;
}
