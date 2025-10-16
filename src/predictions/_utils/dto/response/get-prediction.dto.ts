import { OpenedWindowsDurationDto } from '../../../../_utils/dto/opened-windows-duration.dto';

export class GetPredictionDto {
  id: string;
  hotHouseId: string;
  openedWindowsDurationsPredicted: OpenedWindowsDurationDto[];
  predictionDate: Date;
}
