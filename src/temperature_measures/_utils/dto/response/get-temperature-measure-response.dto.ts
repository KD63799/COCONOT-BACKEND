import { ApiProperty } from '@nestjs/swagger';

export class GetTemperatureMeasureResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  hotHouseId: string;

  @ApiProperty()
  temperatureMeasuredInsideHotHouse: number;

  @ApiProperty()
  temperatureFromWeather: number;

  @ApiProperty()
  timestamp: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
