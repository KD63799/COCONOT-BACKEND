import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { CreateOpeningMeasureDto } from './dto/request/create-opening-measure.dto';
import { OpeningMeasureResponseDto } from './dto/response/opening-measure-response.dto';
import { HotHousesService } from '../hothouses/hothouses.service';
import { OpeningMeasuresRepository } from './opening-measures.repository';
import { DailyReportsService } from '../daily_reports/daily_reports.service';
import { OpeningMeasureMapper } from './opening-measures.mapper';

@Injectable()
export class OpeningMeasuresService {
  constructor(
    private readonly repository: OpeningMeasuresRepository,
    private readonly mapper: OpeningMeasureMapper,
    @Inject(forwardRef(() => DailyReportsService))
    private readonly dailyReportsService: DailyReportsService,
    private readonly hotHousesService: HotHousesService,
  ) {}

  async create(createDto: CreateOpeningMeasureDto): Promise<OpeningMeasureResponseDto> {
    const entity = this.mapper.toEntity(createDto);
    const created = await this.repository.create(entity);
    const response = this.mapper.toResponseDto(created);

    try {
      const hotHouse = await this.hotHousesService.findOne(createDto.hotHouseId);
      await this.dailyReportsService.addOpenedWindow(
        createDto.hotHouseId,
        hotHouse.name,
        createDto.openWindowTime,
        createDto.closeWindowTime,
        createDto.timestamp || new Date(),
      );
    } catch (error) {
      console.error("Erreur lors de l'ajout au rapport journalier:", error);
    }

    return response;
  }

  async findAll(): Promise<OpeningMeasureResponseDto[]> {
    const docs = await this.repository.findAll();
    return this.mapper.toResponseDtoArray(docs);
  }

  async findByHotHouseId(hotHouseId: string): Promise<OpeningMeasureResponseDto[]> {
    const docs = await this.repository.findByHotHouseId(hotHouseId);
    return this.mapper.toResponseDtoArray(docs);
  }

  async findByHotHouseIdAndDateRange(
    hotHouseId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<OpeningMeasureResponseDto[]> {
    const docs = await this.repository.findByHotHouseIdAndDateRange(hotHouseId, startDate, endDate);
    return this.mapper.toResponseDtoArray(docs);
  }

  async findOne(id: string): Promise<OpeningMeasureResponseDto> {
    const doc = await this.repository.findById(id);
    if (!doc) {
      throw new NotFoundException(`OpeningMeasure with ID ${id} not found`);
    }
    return this.mapper.toResponseDto(doc);
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`OpeningMeasure with ID ${id} not found`);
    }
  }
}
