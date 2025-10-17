import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HumidityMeasure, HumidityMeasureDocument } from './humidity-measure.schema';

@Injectable()
export class HumidityMeasuresRepository {
  constructor(
    @InjectModel(HumidityMeasure.name)
    private readonly humidityMeasureModel: Model<HumidityMeasure>,
  ) {}

  async create(data: Partial<HumidityMeasure>): Promise<HumidityMeasureDocument> {
    const created = new this.humidityMeasureModel(data);
    return created.save();
  }

  async findAll(): Promise<HumidityMeasureDocument[]> {
    return this.humidityMeasureModel.find().exec();
  }

  async findById(id: string): Promise<HumidityMeasureDocument | null> {
    return this.humidityMeasureModel.findById(id).exec();
  }

  async findByHotHouseId(hotHouseId: string): Promise<HumidityMeasureDocument[]> {
    return this.humidityMeasureModel.find({ hotHouseId }).sort({ timestamp: -1 }).exec();
  }

  async findByHotHouseIdAndDateRange(
    hotHouseId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<HumidityMeasureDocument[]> {
    return this.humidityMeasureModel
      .find({
        hotHouseId,
        timestamp: { $gte: startDate, $lte: endDate },
      })
      .sort({ timestamp: 1 })
      .exec();
  }

  async delete(id: string): Promise<HumidityMeasureDocument | null> {
    return this.humidityMeasureModel.findByIdAndDelete(id).exec();
  }
}
