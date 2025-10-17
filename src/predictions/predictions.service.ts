import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Prediction, PredictionDocument } from './predictions.schema';
import { CreatePredictionDto } from './_utils/dto/request/create-prediction.dto';

@Injectable()
export class PredictionsService {
  constructor(@InjectModel(Prediction.name) private predictionModel: Model<PredictionDocument>) {}

  async create(createDto: CreatePredictionDto): Promise<PredictionDocument> {
    const invalidWindows = createDto.openedWindowsDurationsPredicted.filter(
      (window) => window.hotHouseId !== createDto.hotHouseId,
    );

    if (invalidWindows.length > 0) {
      throw new BadRequestException(
        `Tous les hotHouseId dans openedWindowsDurationsPredicted doivent correspondre au hotHouseId de la prédiction (${createDto.hotHouseId})`,
      );
    }

    const createdPrediction = new this.predictionModel(createDto);
    return createdPrediction.save();
  }

  async findAll(): Promise<PredictionDocument[]> {
    return this.predictionModel.find().exec();
  }

  async findByHotHouseId(hotHouseId: string): Promise<PredictionDocument[]> {
    return this.predictionModel.find({ hotHouseId }).sort({ predictionDate: -1 }).exec();
  }

  async findTodayPredictions(): Promise<PredictionDocument[]> {
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

  async findByDate(date: string): Promise<PredictionDocument[]> {
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

  async findOne(id: string): Promise<PredictionDocument> {
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
