import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OpeningMeasure, OpeningMeasureDocument } from './opening-measures.schema';

@Injectable()
export class OpeningMeasuresRepository {
  constructor(
    @InjectModel(OpeningMeasure.name)
    private readonly openingMeasureModel: Model<OpeningMeasure>,
  ) {}

  async create(data: Partial<OpeningMeasure>): Promise<OpeningMeasureDocument> {
    const created = new this.openingMeasureModel(data);
    return created.save();
  }

  async findAll(): Promise<OpeningMeasureDocument[]> {
    return this.openingMeasureModel.find().exec();
  }

  async findById(id: string): Promise<OpeningMeasureDocument | null> {
    return this.openingMeasureModel.findById(id).exec();
  }

  async findByHotHouseId(hotHouseId: string): Promise<OpeningMeasureDocument[]> {
    return this.openingMeasureModel.find({ hotHouseId }).sort({ timestamp: -1 }).exec();
  }

  async findByHotHouseIdAndDateRange(
    hotHouseId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<OpeningMeasureDocument[]> {
    return this.openingMeasureModel
      .find({
        hotHouseId,
        timestamp: { $gte: startDate, $lte: endDate },
      })
      .sort({ timestamp: 1 })
      .exec();
  }

  async delete(id: string): Promise<OpeningMeasureDocument | null> {
    return this.openingMeasureModel.findByIdAndDelete(id).exec();
  }
}
