import { Injectable, NotFoundException } from '@nestjs/common';
import { HumidityMeasureMapper } from './humidityMeasure.mapper';
import { CreateHumidityMeasureDto } from './_utils/dto/request/create-humidity-measure.dto';
import { GetHumidityMeasureResponseDto } from './_utils/dto/response/get-humidity-measure-response.dto';
import { HumidityMeasuresRepository } from './humidity-measures.repository';

@Injectable()
export class HumidityMeasuresService {
  constructor(
    private readonly repository: HumidityMeasuresRepository,
    private readonly mapper: HumidityMeasureMapper,
  ) {}

  async create(createDto: CreateHumidityMeasureDto): Promise<GetHumidityMeasureResponseDto> {
    const entity = this.mapper.toEntity(createDto);
    const created = await this.repository.create(entity);
    return this.mapper.toResponseDto(created);
  }

  async findAll(): Promise<GetHumidityMeasureResponseDto[]> {
    const docs = await this.repository.findAll();
    return this.mapper.toResponseDtoArray(docs);
  }

  async findByHotHouseId(hotHouseId: string): Promise<GetHumidityMeasureResponseDto[]> {
    const docs = await this.repository.findByHotHouseId(hotHouseId);
    return this.mapper.toResponseDtoArray(docs);
  }

  async findByHotHouseIdAndDateRange(
    hotHouseId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<GetHumidityMeasureResponseDto[]> {
    const docs = await this.repository.findByHotHouseIdAndDateRange(hotHouseId, startDate, endDate);
    return this.mapper.toResponseDtoArray(docs);
  }

  async findOne(id: string): Promise<GetHumidityMeasureResponseDto> {
    const doc = await this.repository.findById(id);
    if (!doc) {
      throw new NotFoundException(`HumidityMeasure with ID ${id} not found`);
    }
    return this.mapper.toResponseDto(doc);
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`HumidityMeasure with ID ${id} not found`);
    }
  }
}
