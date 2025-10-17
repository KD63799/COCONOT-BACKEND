import { Injectable } from '@nestjs/common';
import { HumidityMeasure, HumidityMeasureDocument } from './humidity-measure.schema';
import { GetHumidityMeasureResponseDto } from './_utils/dto/response/get-humidity-measure-response.dto';
import { CreateHumidityMeasureDto } from './_utils/dto/request/create-humidity-measure.dto';

@Injectable()
export class HumidityMeasureMapper {
  toResponseDto(doc: HumidityMeasureDocument): GetHumidityMeasureResponseDto {
    return {
      id: doc.id,
      hotHouseId: doc.hotHouseId.toString(),
      humidityMeasuredInsideHotHouse: doc.humidityMeasuredInsideHotHouse,
      humidityFromWeather: doc.humidityFromWeather,
      timestamp: doc.timestamp,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  toResponseDtoArray(docs: HumidityMeasureDocument[]): GetHumidityMeasureResponseDto[] {
    return docs.map((doc) => this.toResponseDto(doc));
  }

  toEntity(createDto: CreateHumidityMeasureDto): Partial<HumidityMeasure> {
    return {
      hotHouseId: createDto.hotHouseId as any,
      humidityMeasuredInsideHotHouse: createDto.humidityMeasuredInsideHotHouse,
      humidityFromWeather: createDto.humidityFromWeather,
      timestamp: createDto.timestamp || new Date(),
    };
  }
}
