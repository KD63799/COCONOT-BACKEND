import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GetTemperatureMeasureResponseDto } from '../../../../temperature_measures/_utils/dto/response/get-temperature-measure-response.dto';
import { GetHumidityMeasureResponseDto } from '../../../../humidity_measures/_utils/dto/response/get-humidity-measure-response.dto';
import { GetPredictionDto } from '../../../../predictions/_utils/dto/response/get-prediction.dto';

class OpenedWindowsDurationDto {}

export class CreateDailyReportDto {
  @IsString()
  @IsNotEmpty()
  hotHouseId: string;

  @ValidateNested({ each: true })
  @Type(() => GetTemperatureMeasureResponseDto)
  temperatureMeasurements: GetTemperatureMeasureResponseDto[];

  @ValidateNested({ each: true })
  @Type(() => GetHumidityMeasureResponseDto)
  humidityMeasurements: GetHumidityMeasureResponseDto[];

  @ValidateNested({ each: true })
  @Type(() => OpenedWindowsDurationDto)
  openedWindowsDurations: OpenedWindowsDurationDto[];

  @IsInt()
  @Min(0)
  @Max(5)
  rateOfTheDay: number;

  @IsDateString()
  date: Date;

  @ValidateNested()
  @Type(() => GetPredictionDto)
  @IsOptional()
  predictionOfTheDay?: GetPredictionDto;
}
