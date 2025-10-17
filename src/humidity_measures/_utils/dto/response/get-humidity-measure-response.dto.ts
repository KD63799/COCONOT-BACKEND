import { ApiProperty } from '@nestjs/swagger';

export class GetHumidityMeasureResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  hotHouseId: string;

  @ApiProperty()
  humidityMeasuredInsideHotHouse: number;

  @ApiProperty()
  humidityFromWeather: number;

  @ApiProperty()
  timestamp: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
