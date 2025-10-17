import { AddressDto } from '../../../../_utils/dto/adress.dto';
import { LocalisationGpsDto } from '../../../../_utils/dto/localisation-gps.dto';

export class GetHotHouseResponseDto {
  id: string;
  name: string;
  address: AddressDto;
  location: LocalisationGpsDto;
  temperatureThresholdMax: number;
  temperatureThresholdMin: number;
  humidityThresholdMax: number;
  humidityThresholdMin: number;
}
