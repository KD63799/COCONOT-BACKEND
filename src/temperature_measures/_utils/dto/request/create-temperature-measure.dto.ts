import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTemperatureMeasureDto {
  @IsString()
  @IsNotEmpty()
  hotHouseId: string;

  @IsNumber()
  temperatureMeasuredInsideHotHouse: number;

  @IsNumber()
  temperatureFromWeather: number;

  @IsDateString()
  @IsOptional()
  timestamp?: Date; // Auto-généré si non fourni
}
