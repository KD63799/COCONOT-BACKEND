import { ApiProperty } from '@nestjs/swagger';
import { OpenedWindowsDurationDto } from '../../../../_utils/dto/opened-windows-duration.dto';

export class DailyReportResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  hotHouseId: string;

  @ApiProperty()
  hotHouseName: string;

  @ApiProperty()
  isSubmitted: boolean;

  @ApiProperty({ type: [String] })
  temperatureMeasurements: string[];

  @ApiProperty({ type: [String] })
  humidityMeasurements: string[];

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
