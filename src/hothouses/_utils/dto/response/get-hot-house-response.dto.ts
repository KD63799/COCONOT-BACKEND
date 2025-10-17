import { ApiProperty } from '@nestjs/swagger';
import { AddressDto } from '../../../../_utils/dto/adress.dto';
import { LocalisationGpsDto } from '../../../../_utils/dto/localisation-gps.dto';

export class GetHotHouseResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: AddressDto })
  address: AddressDto;

  @ApiProperty({ type: LocalisationGpsDto })
  location: LocalisationGpsDto;

  @ApiProperty()
  temperatureThresholdMax: number;

  @ApiProperty()
  temperatureThresholdMin: number;

  @ApiProperty()
  humidityThresholdMax: number;

  @ApiProperty()
  humidityThresholdMin: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
