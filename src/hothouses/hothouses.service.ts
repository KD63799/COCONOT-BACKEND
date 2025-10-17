import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HotHouseWithPredictionResponseDto } from './_utils/dto/response/get-hot-house-with-prediction-response.dto';
import { PredictionsService } from '../predictions/predictions.service';
import { HotHouse, HotHouseDocument } from './hothouses.schema';
import { CreateHotHouseDto } from './_utils/dto/request/create-hot-house.dto';
import { UpdateHotHouseDto } from './_utils/dto/request/update-hot-house.dto';

@Injectable()
export class HotHousesService {
  constructor(
    @InjectModel(HotHouse.name) private hotHouseModel: Model<HotHouseDocument>,
    private predictionsService: PredictionsService,
  ) {}

  async create(createHotHouseDto: CreateHotHouseDto): Promise<HotHouseDocument> {
    const createdHotHouse = new this.hotHouseModel(createHotHouseDto);
    return createdHotHouse.save();
  }

  async findAll(): Promise<HotHouseDocument[]> {
    return this.hotHouseModel.find().exec();
  }

  async findOne(id: string): Promise<HotHouseDocument> {
    const hotHouse = await this.hotHouseModel.findById(id).exec();
    if (!hotHouse) {
      throw new NotFoundException(`HotHouse with ID ${id} not found`);
    }
    return hotHouse;
  }

  async update(id: string, updateHotHouseDto: UpdateHotHouseDto): Promise<HotHouseDocument> {
    const updatedHotHouse = await this.hotHouseModel.findByIdAndUpdate(id, updateHotHouseDto, { new: true }).exec();
    if (!updatedHotHouse) {
      throw new NotFoundException(`HotHouse with ID ${id} not found`);
    }
    return updatedHotHouse;
  }

  async remove(id: string): Promise<void> {
    const result = await this.hotHouseModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`HotHouse with ID ${id} not found`);
    }
  }

  async findAllWithTodayPredictions(): Promise<HotHouseWithPredictionResponseDto[]> {
    const hotHouses = await this.findAll();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const results: HotHouseWithPredictionResponseDto[] = [];

    for (const hotHouse of hotHouses) {
      const predictions = await this.predictionsService.findByHotHouseId(hotHouse.id);

      const todayPrediction = predictions.find((pred) => {
        const predDate = new Date(pred.predictionDate);
        return predDate >= today && predDate < tomorrow;
      });

      results.push({
        hotHouse: {
          id: hotHouse.id,
          name: hotHouse.name,
          address: hotHouse.address,
          location: hotHouse.location,
          temperatureThresholdMax: hotHouse.temperatureThresholdMax,
          temperatureThresholdMin: hotHouse.temperatureThresholdMin,
          humidityThresholdMax: hotHouse.humidityThresholdMax,
          humidityThresholdMin: hotHouse.humidityThresholdMin,
          createdAt: hotHouse.createdAt,
          updatedAt: hotHouse.updatedAt,
        },
        predictionsOfTheDay: todayPrediction
          ? {
              id: todayPrediction.id,
              hotHouseId: todayPrediction.hotHouseId.toString(),
              openedWindowsDurationsPredicted: todayPrediction.openedWindowsDurationsPredicted,
              predictionDate: todayPrediction.predictionDate,
              createdAt: todayPrediction.createdAt,
              updatedAt: todayPrediction.updatedAt,
            }
          : null,
      });
    }

    return results;
  }

  async findOneWithTodayPrediction(id: string): Promise<HotHouseWithPredictionResponseDto> {
    const hotHouse = await this.findOne(id);
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
      hotHouse: {
        id: hotHouse.id,
        name: hotHouse.name,
        address: hotHouse.address,
        location: hotHouse.location,
        temperatureThresholdMax: hotHouse.temperatureThresholdMax,
        temperatureThresholdMin: hotHouse.temperatureThresholdMin,
        humidityThresholdMax: hotHouse.humidityThresholdMax,
        humidityThresholdMin: hotHouse.humidityThresholdMin,
        createdAt: hotHouse.createdAt,
        updatedAt: hotHouse.updatedAt,
      },
      predictionsOfTheDay: todayPrediction
        ? {
            id: todayPrediction.id,
            hotHouseId: todayPrediction.hotHouseId.toString(),
            openedWindowsDurationsPredicted: todayPrediction.openedWindowsDurationsPredicted,
            predictionDate: todayPrediction.predictionDate,
            createdAt: todayPrediction.createdAt,
            updatedAt: todayPrediction.updatedAt,
          }
        : null,
    };
  }
}
