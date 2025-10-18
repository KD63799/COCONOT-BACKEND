import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Prediction, PredictionDocument } from './predictions.schema';

@Injectable()
export class PredictionsRepository {
  constructor(@InjectModel(Prediction.name) private readonly predictionModel: Model<Prediction>) {}

  async create(data: Partial<Prediction>): Promise<PredictionDocument> {
    const created = new this.predictionModel(data);
    return created.save();
  }

  async findAll(): Promise<PredictionDocument[]> {
    return this.predictionModel.find().exec();
  }

  async findById(id: string): Promise<PredictionDocument | null> {
    return this.predictionModel.findById(id).exec();
  }

  async findByHotHouseId(hotHouseId: string): Promise<PredictionDocument[]> {
    return this.predictionModel.find({ hotHouseId }).sort({ predictionDate: -1 }).exec();
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<PredictionDocument[]> {
    return this.predictionModel
      .find({
        predictionDate: { $gte: startDate, $lte: endDate },
      })
      .exec();
  }

  async delete(id: string): Promise<PredictionDocument | null> {
    return this.predictionModel.findByIdAndDelete(id).exec();
  }
  async deleteAll() {
    this.predictionModel.deleteMany().exec();
  }
}
