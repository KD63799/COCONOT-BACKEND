import { Injectable, NotFoundException } from '@nestjs/common';
import { TemperatureMeasuresRepository } from './temperature-measures.repository';
import { TemperatureMeasureMapper } from './temperature-measures.mapper';
import { CreateTemperatureMeasureDto } from './_utils/dto/request/create-temperature-measure.dto';
import { GetTemperatureMeasureResponseDto } from './_utils/dto/response/get-temperature-measure-response.dto';

@Injectable()
export class TemperatureMeasuresService {
  constructor(
    private readonly repository: TemperatureMeasuresRepository,
    private readonly mapper: TemperatureMeasureMapper,
  ) {}

  async create(createDto: CreateTemperatureMeasureDto): Promise<GetTemperatureMeasureResponseDto> {
    const entity = this.mapper.toEntity(createDto);
    const created = await this.repository.create(entity);
    return this.mapper.toResponseDto(created);
  }

  async findAll(): Promise<GetTemperatureMeasureResponseDto[]> {
    const docs = await this.repository.findAll();
    return this.mapper.toResponseDtoArray(docs);
  }

  async findByHotHouseId(hotHouseId: string): Promise<GetTemperatureMeasureResponseDto[]> {
    const docs = await this.repository.findByHotHouseId(hotHouseId);
    return this.mapper.toResponseDtoArray(docs);
  }

  async findByHotHouseIdAndDateRange(
    hotHouseId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<GetTemperatureMeasureResponseDto[]> {
    const docs = await this.repository.findByHotHouseIdAndDateRange(hotHouseId, startDate, endDate);
    return this.mapper.toResponseDtoArray(docs);
  }

  async findOne(id: string): Promise<GetTemperatureMeasureResponseDto> {
    const doc = await this.repository.findById(id);
    if (!doc) {
      throw new NotFoundException(`TemperatureMeasure with ID ${id} not found`);
    }
    return this.mapper.toResponseDto(doc);
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`TemperatureMeasure with ID ${id} not found`);
    }
  }
}
