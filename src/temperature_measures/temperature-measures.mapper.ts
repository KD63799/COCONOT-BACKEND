import { Injectable } from '@nestjs/common';
import { TemperatureMeasure, TemperatureMeasureDocument } from './temperature-measures.schema';
import { CreateTemperatureMeasureDto } from './_utils/dto/request/create-temperature-measure.dto';
import { GetTemperatureMeasureResponseDto } from './_utils/dto/response/get-temperature-measure-response.dto';

@Injectable()
export class TemperatureMeasureMapper {
  toResponseDto(doc: TemperatureMeasureDocument): GetTemperatureMeasureResponseDto {
    return {
      id: doc.id,
      hotHouseId: doc.hotHouseId.toString(),
      temperatureMeasuredInsideHotHouse: doc.temperatureMeasuredInsideHotHouse,
      temperatureFromWeather: doc.temperatureFromWeather,
      timestamp: doc.timestamp,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  toResponseDtoArray(docs: TemperatureMeasureDocument[]): GetTemperatureMeasureResponseDto[] {
    return docs.map((doc) => this.toResponseDto(doc));
  }

  toEntity(createDto: CreateTemperatureMeasureDto): Partial<TemperatureMeasure> {
    return {
      hotHouseId: createDto.hotHouseId as any,
      temperatureMeasuredInsideHotHouse: createDto.temperatureMeasuredInsideHotHouse,
      temperatureFromWeather: createDto.temperatureFromWeather,
      timestamp: createDto.timestamp || new Date(),
    };
  }
}
