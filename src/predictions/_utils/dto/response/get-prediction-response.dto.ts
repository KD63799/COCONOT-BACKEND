import { ApiProperty } from '@nestjs/swagger';
import { OpenedWindowsDurationDto } from '../../../../_utils/dto/opened-windows-duration.dto';

export class GetPredictionResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  hotHouseId: string;

  @ApiProperty({ type: [OpenedWindowsDurationDto] })
  openedWindowsDurationsPredicted: OpenedWindowsDurationDto[];

  @ApiProperty()
  predictionDate: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
