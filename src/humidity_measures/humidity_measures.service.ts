import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { CreateHumidityMeasureDto } from './_utils/dto/request/create-humidity-measure.dto';
import { HotHousesService } from '../hothouses/hothouses.service';
import { HumidityMeasuresRepository } from './humidity-measures.repository';
import { HumidityMeasureMapper } from './humidityMeasure.mapper';
import { DailyReportsService } from '../daily_reports/daily_reports.service';
import { GetHumidityMeasureResponseDto } from './_utils/dto/response/get-humidity-measure-response.dto';

@Injectable()
export class HumidityMeasuresService {
  constructor(
    private readonly repository: HumidityMeasuresRepository,
    private readonly mapper: HumidityMeasureMapper,
    @Inject(forwardRef(() => DailyReportsService)) // ✅ Utiliser @Inject + forwardRef
    private readonly dailyReportsService: DailyReportsService,
    private readonly hotHousesService: HotHousesService,
  ) {}

  async create(createDto: CreateHumidityMeasureDto): Promise<GetHumidityMeasureResponseDto> {
    const entity = this.mapper.toEntity(createDto);
    const created = await this.repository.create(entity);
    const response = this.mapper.toResponseDto(created);

    try {
      const hotHouse = await this.hotHousesService.findOne(createDto.hotHouseId);
      await this.dailyReportsService.addHumidityMeasure(
        createDto.hotHouseId,
        hotHouse.name,
        response.id,
        createDto.timestamp || new Date(),
      );
    } catch (error) {
      console.error("Erreur lors de l'ajout au rapport journalier:", error);
    }

    return response;
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
