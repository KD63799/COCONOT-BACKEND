import { AddressDto, LocalisationGpsDto } from '../request/create-hot-house.dto';

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
