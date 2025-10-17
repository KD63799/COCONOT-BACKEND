import { Injectable } from '@nestjs/common';
import { OpeningMeasure, OpeningMeasureDocument } from './opening-measures.schema';
import { OpeningMeasureResponseDto } from './dto/response/opening-measure-response.dto';
import { CreateOpeningMeasureDto } from './dto/request/create-opening-measure.dto';

@Injectable()
export class OpeningMeasureMapper {
  toResponseDto(doc: OpeningMeasureDocument): OpeningMeasureResponseDto {
    return {
      id: doc.id,
      hotHouseId: doc.hotHouseId.toString(),
      openWindowTime: doc.openWindowTime,
      closeWindowTime: doc.closeWindowTime,
      timestamp: doc.timestamp,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  toResponseDtoArray(docs: OpeningMeasureDocument[]): OpeningMeasureResponseDto[] {
    return docs.map((doc) => this.toResponseDto(doc));
  }

  toEntity(createDto: CreateOpeningMeasureDto): Partial<OpeningMeasure> {
    return {
      hotHouseId: createDto.hotHouseId as any,
      openWindowTime: createDto.openWindowTime,
      closeWindowTime: createDto.closeWindowTime,
      timestamp: createDto.timestamp || new Date(),
    };
  }
}
