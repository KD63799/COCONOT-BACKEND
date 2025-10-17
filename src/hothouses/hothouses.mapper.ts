import { Injectable } from '@nestjs/common';
import { HotHouse, HotHouseDocument } from './hothouses.schema';
import { GetHotHouseResponseDto } from './_utils/dto/response/get-hot-house-response.dto';
import { CreateHotHouseDto } from './_utils/dto/request/create-hot-house.dto';

@Injectable()
export class HotHouseMapper {
  toResponseDto(doc: HotHouseDocument): GetHotHouseResponseDto {
    return {
      id: doc.id,
      name: doc.name,
      address: doc.address,
      location: doc.location,
      temperatureThresholdMax: doc.temperatureThresholdMax,
      temperatureThresholdMin: doc.temperatureThresholdMin,
      humidityThresholdMax: doc.humidityThresholdMax,
      humidityThresholdMin: doc.humidityThresholdMin,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  toResponseDtoArray(docs: HotHouseDocument[]): GetHotHouseResponseDto[] {
    return docs.map((doc) => this.toResponseDto(doc));
  }

  toEntity(createDto: CreateHotHouseDto): Partial<HotHouse> {
    return {
      name: createDto.name,
      address: createDto.address,
      location: createDto.location,
      temperatureThresholdMax: createDto.temperatureThresholdMax,
      temperatureThresholdMin: createDto.temperatureThresholdMin,
      humidityThresholdMax: createDto.humidityThresholdMax,
      humidityThresholdMin: createDto.humidityThresholdMin,
    };
  }
}
