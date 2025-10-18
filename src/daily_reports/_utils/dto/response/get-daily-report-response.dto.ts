import { ApiProperty } from '@nestjs/swagger';
import { OpenedWindowsDurationDto } from '../../../../_utils/dto/opened-windows-duration.dto';
import { GetTemperatureMeasureResponseDto } from '../../../../temperature_measures/_utils/dto/response/get-temperature-measure-response.dto';
import { GetHumidityMeasureResponseDto } from '../../../../humidity_measures/_utils/dto/response/get-humidity-measure-response.dto';

export class DailyReportResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  hotHouseId: string;

  @ApiProperty()
  hotHouseName: string;

  @ApiProperty()
  isSubmitted: boolean;

  @ApiProperty({
    type: [GetTemperatureMeasureResponseDto],
    description: 'Liste des mesures de température (objets complets)',
  })
  temperatureMeasurements: GetTemperatureMeasureResponseDto[] | string[];

  @ApiProperty({
    type: [GetHumidityMeasureResponseDto],
    description: "Liste des mesures d'humidité (objets complets)",
  })
  humidityMeasurements: GetHumidityMeasureResponseDto[] | string[];

  @ApiProperty({ type: [OpenedWindowsDurationDto] })
  openedWindowsDurations: OpenedWindowsDurationDto[];

  @ApiProperty()
  rateOfTheDay: number;

  @ApiProperty()
  date: Date;

  @ApiProperty({ required: false })
  predictionOfTheDay?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
