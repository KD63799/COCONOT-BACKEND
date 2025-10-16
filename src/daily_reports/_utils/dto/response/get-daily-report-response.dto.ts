import { GetPredictionDto } from '../../../../predictions/_utils/dto/response/get-prediction.dto';
import { GetTemperatureMeasureResponseDto } from '../../../../temperature_measures/_utils/dto/response/get-temperature-measure-response.dto';
import { GetHumidityMeasureResponseDto } from '../../../../humidity_measures/_utils/dto/response/get-humidity-measure-response.dto';
import { OpenedWindowsDurationDto } from '../../../../_utils/dto/opened-windows-duration.dto';

export class DailyReportResponseDto {
  id: string;
  hotHouseId: string;
  temperatureMeasurements: GetTemperatureMeasureResponseDto[];
  humidityMeasurements: GetHumidityMeasureResponseDto[];
  openedWindowsDurations: OpenedWindowsDurationDto[];
  rateOfTheDay: number;
  date: Date;
  predictionOfTheDay?: GetPredictionDto;
}
