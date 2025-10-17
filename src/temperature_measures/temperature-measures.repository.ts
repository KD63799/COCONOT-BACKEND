import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TemperatureMeasure, TemperatureMeasureDocument } from './temperature-measures.schema';

@Injectable()
export class TemperatureMeasuresRepository {
  constructor(
    @InjectModel(TemperatureMeasure.name)
    private readonly temperatureMeasureModel: Model<TemperatureMeasure>,
  ) {}

  async create(data: Partial<TemperatureMeasure>): Promise<TemperatureMeasureDocument> {
    const created = new this.temperatureMeasureModel(data);
    return created.save();
  }

  async findAll(): Promise<TemperatureMeasureDocument[]> {
    return this.temperatureMeasureModel.find().exec();
  }

  async findById(id: string): Promise<TemperatureMeasureDocument | null> {
    return this.temperatureMeasureModel.findById(id).exec();
  }

  async findByHotHouseId(hotHouseId: string): Promise<TemperatureMeasureDocument[]> {
    return this.temperatureMeasureModel.find({ hotHouseId }).sort({ timestamp: -1 }).exec();
  }

  async findByHotHouseIdAndDateRange(
    hotHouseId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<TemperatureMeasureDocument[]> {
    return this.temperatureMeasureModel
      .find({
        hotHouseId,
        timestamp: { $gte: startDate, $lte: endDate },
      })
      .sort({ timestamp: 1 })
      .exec();
  }

  async delete(id: string): Promise<TemperatureMeasureDocument | null> {
    return this.temperatureMeasureModel.findByIdAndDelete(id).exec();
  }
}
