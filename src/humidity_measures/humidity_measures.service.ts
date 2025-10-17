import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHumidityMeasureDto } from './_utils/dto/request/create-humidity-measure.dto';
import { HumidityMeasure, HumidityMeasureDocument } from './humidity-measure.schema';

@Injectable()
export class HumidityMeasuresService {
  constructor(
    @InjectModel(HumidityMeasure.name)
    private humidityMeasureModel: Model<HumidityMeasureDocument>,
  ) {}

  async create(createDto: CreateHumidityMeasureDto): Promise<HumidityMeasure> {
    const createdMeasure = new this.humidityMeasureModel({
      ...createDto,
      timestamp: createDto.timestamp || new Date(),
    });
    return createdMeasure.save();
  }

  async findAll(): Promise<HumidityMeasure[]> {
    return this.humidityMeasureModel.find().exec();
  }

  async findByHotHouseId(hotHouseId: string): Promise<HumidityMeasure[]> {
    return this.humidityMeasureModel.find({ hotHouseId }).sort({ timestamp: -1 }).exec();
  }

  async findByHotHouseIdAndDateRange(hotHouseId: string, startDate: Date, endDate: Date): Promise<HumidityMeasure[]> {
    return this.humidityMeasureModel
      .find({
        hotHouseId,
        timestamp: { $gte: startDate, $lte: endDate },
      })
      .sort({ timestamp: 1 })
      .exec();
  }

  async findOne(id: string): Promise<HumidityMeasure> {
    const measure = await this.humidityMeasureModel.findById(id).exec();
    if (!measure) {
      throw new NotFoundException(`HumidityMeasure with ID ${id} not found`);
    }
    return measure;
  }

  async remove(id: string): Promise<void> {
    const result = await this.humidityMeasureModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`HumidityMeasure with ID ${id} not found`);
    }
  }
}
