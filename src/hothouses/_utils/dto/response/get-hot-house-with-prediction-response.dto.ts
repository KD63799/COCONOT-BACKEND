import { ApiProperty } from '@nestjs/swagger';
import { GetHotHouseResponseDto } from './get-hot-house-response.dto';
import { GetPredictionResponseDto } from '../../../../predictions/_utils/dto/response/get-prediction-response.dto';

export class HotHouseWithPredictionResponseDto {
  @ApiProperty({ type: GetHotHouseResponseDto })
  hotHouse: GetHotHouseResponseDto;

  @ApiProperty({ type: GetPredictionResponseDto, nullable: true })
  predictionsOfTheDay: GetPredictionResponseDto | null;
}
