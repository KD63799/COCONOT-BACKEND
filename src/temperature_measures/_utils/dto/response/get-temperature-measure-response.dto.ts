export class GetTemperatureMeasureResponseDto {
  id: string;
  hotHouseId: string;
  temperatureMeasuredInsideHotHouse: number;
  temperatureFromWeather: number;
  timestamp: Date;
}
