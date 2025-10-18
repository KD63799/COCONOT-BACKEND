import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';

import { CreatePredictionDto } from './_utils/dto/request/create-prediction.dto';
import { GetPredictionResponseDto } from './_utils/dto/response/get-prediction-response.dto';
import { PredictionsRepository } from './predictions.repository';
import { PredictionMapper } from './predictions.mapper';

@Injectable()
export class PredictionsService {
  constructor(
    private readonly repository: PredictionsRepository,
    private readonly mapper: PredictionMapper,
  ) {}

  async create(createDto: CreatePredictionDto): Promise<GetPredictionResponseDto> {
    const invalidWindows = createDto.openedWindowsDurationsPredicted.filter(
      (window) => window.hotHouseId !== createDto.hotHouseId,
    );

    if (invalidWindows.length > 0) {
      throw new BadRequestException(
        `Tous les hotHouseId dans openedWindowsDurationsPredicted doivent correspondre au hotHouseId de la prédiction (${createDto.hotHouseId})`,
      );
    }

    const entity = this.mapper.toEntity(createDto);
    const created = await this.repository.create(entity);
    return this.mapper.toResponseDto(created);
  }

  async findAll(): Promise<GetPredictionResponseDto[]> {
    const docs = await this.repository.findAll();
    return this.mapper.toResponseDtoArray(docs);
  }

  async findByHotHouseId(hotHouseId: string): Promise<GetPredictionResponseDto[]> {
    const docs = await this.repository.findByHotHouseId(hotHouseId);
    return this.mapper.toResponseDtoArray(docs);
  }

  async findTodayPredictions(): Promise<GetPredictionResponseDto[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const docs = await this.repository.findByDateRange(today, tomorrow);
    return this.mapper.toResponseDtoArray(docs);
  }

  async findByDate(date: string): Promise<GetPredictionResponseDto[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const docs = await this.repository.findByDateRange(startOfDay, endOfDay);
    return this.mapper.toResponseDtoArray(docs);
  }

  async findOne(id: string): Promise<GetPredictionResponseDto> {
    const doc = await this.repository.findById(id);
    if (!doc) {
      throw new NotFoundException(`Prediction with ID ${id} not found`);
    }
    return this.mapper.toResponseDto(doc);
  }

  async remove(id: string): Promise<void> {
    await this.repository.deleteAll();
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Prediction with ID ${id} not found`);
    }
  }
}
