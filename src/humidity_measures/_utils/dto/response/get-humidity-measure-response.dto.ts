export class GetHumidityMeasureResponseDto {
  id: string;
  hotHouseId: string;
  humidityMeasuredInsideHotHouse: number;
  humidityFromWeather: number;
  timestamp: Date;
}
