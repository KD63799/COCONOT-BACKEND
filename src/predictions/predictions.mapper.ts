import { Injectable } from '@nestjs/common';
import { Prediction, PredictionDocument } from './predictions.schema';
import { GetPredictionResponseDto } from './_utils/dto/response/get-prediction-response.dto';
import { CreatePredictionDto } from './_utils/dto/request/create-prediction.dto';

@Injectable()
export class PredictionMapper {
  toResponseDto(doc: PredictionDocument): GetPredictionResponseDto {
    return {
      id: doc.id,
      hotHouseId: doc.hotHouseId.toString(),
      openedWindowsDurationsPredicted: doc.openedWindowsDurationsPredicted,
      predictionDate: doc.predictionDate,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  toResponseDtoArray(docs: PredictionDocument[]): GetPredictionResponseDto[] {
    return docs.map((doc) => this.toResponseDto(doc));
  }

  toEntity(createDto: CreatePredictionDto): Partial<Prediction> {
    return {
      hotHouseId: createDto.hotHouseId as any,
      openedWindowsDurationsPredicted: createDto.openedWindowsDurationsPredicted,
      predictionDate: createDto.predictionDate,
    };
  }
}
