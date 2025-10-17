import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateHumidityMeasureDto {
  @IsString()
  @IsNotEmpty()
  hotHouseId: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  humidityMeasuredInsideHotHouse: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  humidityFromWeather: number;

  @IsDateString()
  @IsOptional()
  timestamp?: Date;
}
