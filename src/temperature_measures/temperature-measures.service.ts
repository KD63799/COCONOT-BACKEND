import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { CreateTemperatureMeasureDto } from './_utils/dto/request/create-temperature-measure.dto';
import { HotHousesService } from '../hothouses/hothouses.service';
import { DailyReportsService } from '../daily_reports/daily_reports.service';
import { TemperatureMeasuresRepository } from './temperature-measures.repository';
import { TemperatureMeasureMapper } from './temperature-measures.mapper';
import { GetTemperatureMeasureResponseDto } from './_utils/dto/response/get-temperature-measure-response.dto';

@Injectable()
export class TemperatureMeasuresService {
  constructor(
    private readonly repository: TemperatureMeasuresRepository,
    private readonly mapper: TemperatureMeasureMapper,
    @Inject(forwardRef(() => DailyReportsService)) // ✅ Utiliser @Inject + forwardRef
    private readonly dailyReportsService: DailyReportsService,
    private readonly hotHousesService: HotHousesService,
  ) {}

  async create(createDto: CreateTemperatureMeasureDto): Promise<GetTemperatureMeasureResponseDto> {
    const entity = this.mapper.toEntity(createDto);
    const created = await this.repository.create(entity);
    const response = this.mapper.toResponseDto(created);

    try {
      const hotHouse = await this.hotHousesService.findOne(createDto.hotHouseId);
      await this.dailyReportsService.addTemperatureMeasure(
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
