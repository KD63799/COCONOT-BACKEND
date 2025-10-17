import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Prediction, PredictionDocument } from './predictions.schema';
import { CreatePredictionDto } from './_utils/dto/request/create-prediction.dto';

@Injectable()
export class PredictionsService {
  constructor(@InjectModel(Prediction.name) private predictionModel: Model<PredictionDocument>) {}

  async create(createDto: CreatePredictionDto): Promise<PredictionDocument> {
    const createdPrediction = new this.predictionModel(createDto);
    return createdPrediction.save();
  }

  async findAll(): Promise<PredictionDocument[]> {
    return this.predictionModel.find().exec();
  }

  async findByHotHouseId(hotHouseId: string): Promise<PredictionDocument[]> {
    return this.predictionModel.find({ hotHouseId }).sort({ predictionDate: -1 }).exec();
  }

  async findTodayPredictions(): Promise<Prediction[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return this.predictionModel
      .find({
        predictionDate: { $gte: today, $lt: tomorrow },
      })
      .exec();
  }

  async findByDate(date: string): Promise<Prediction[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return this.predictionModel
      .find({
        predictionDate: { $gte: startOfDay, $lte: endOfDay },
      })
      .exec();
  }

  async findOne(id: string): Promise<Prediction> {
    const prediction = await this.predictionModel.findById(id).exec();
    if (!prediction) {
      throw new NotFoundException(`Prediction with ID ${id} not found`);
    }
    return prediction;
  }

  async remove(id: string): Promise<void> {
    const result = await this.predictionModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Prediction with ID ${id} not found`);
    }
  }
}
