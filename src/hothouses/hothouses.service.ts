import { Injectable, NotFoundException } from '@nestjs/common';
import { GetHotHouseResponseDto } from './_utils/dto/response/get-hot-house-response.dto';
import { HotHouseWithPredictionResponseDto } from './_utils/dto/response/get-hot-house-with-prediction-response.dto';
import { PredictionsService } from '../predictions/predictions.service';
import { HotHousesRepository } from './hothouses.repository';
import { HotHouseMapper } from './hothouses.mapper';
import { CreateHotHouseDto } from './_utils/dto/request/create-hot-house.dto';
import { UpdateHotHouseDto } from './_utils/dto/request/update-hot-house.dto';

@Injectable()
export class HotHousesService {
  constructor(
    private readonly repository: HotHousesRepository,
    private readonly mapper: HotHouseMapper,
    private readonly predictionsService: PredictionsService,
  ) {}

  async create(createDto: CreateHotHouseDto): Promise<GetHotHouseResponseDto> {
    const entity = this.mapper.toEntity(createDto);
    const created = await this.repository.create(entity);
    return this.mapper.toResponseDto(created);
  }

  async findAll(): Promise<GetHotHouseResponseDto[]> {
    const docs = await this.repository.findAll();
    return this.mapper.toResponseDtoArray(docs);
  }

  async findOne(id: string): Promise<GetHotHouseResponseDto> {
    const doc = await this.repository.findById(id);
    if (!doc) {
      throw new NotFoundException(`HotHouse with ID ${id} not found`);
    }
    return this.mapper.toResponseDto(doc);
  }

  async update(id: string, updateDto: UpdateHotHouseDto): Promise<GetHotHouseResponseDto> {
    const updated = await this.repository.update(id, updateDto);
    if (!updated) {
      throw new NotFoundException(`HotHouse with ID ${id} not found`);
    }
    return this.mapper.toResponseDto(updated);
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`HotHouse with ID ${id} not found`);
    }
  }

  async findAllWithTodayPredictions(): Promise<HotHouseWithPredictionResponseDto[]> {
    const hotHouses = await this.repository.findAll();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const results: HotHouseWithPredictionResponseDto[] = [];

    for (const hotHouse of hotHouses) {
      const predictions = await this.predictionsService.findByHotHouseId(hotHouse._id.toString());

      const todayPrediction = predictions.find((pred) => {
        const predDate = new Date(pred.predictionDate);
        return predDate >= today && predDate < tomorrow;
      });

      results.push({
        hotHouse: this.mapper.toResponseDto(hotHouse),
        predictionsOfTheDay: todayPrediction || null,
      });
    }

    return results;
  }

  async findOneWithTodayPrediction(id: string): Promise<HotHouseWithPredictionResponseDto> {
    const hotHouse = await this.repository.findById(id);
    if (!hotHouse) {
      throw new NotFoundException(`HotHouse with ID ${id} not found`);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const predictions = await this.predictionsService.findByHotHouseId(id);
    const todayPrediction = predictions.find((pred) => {
      const predDate = new Date(pred.predictionDate);
      return predDate >= today && predDate < tomorrow;
    });

    return {
      hotHouse: this.mapper.toResponseDto(hotHouse),
      predictionsOfTheDay: todayPrediction || null,
    };
  }
}
