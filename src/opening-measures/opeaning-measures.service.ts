import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OpeningMeasure, OpeningMeasureDocument } from './opening-measures.schema';
import { CreateOpeningMeasureDto } from './dto/request/create-opening-measure.dto';

@Injectable()
export class OpeningMeasuresService {
  constructor(
    @InjectModel(OpeningMeasure.name)
    private openingMeasureModel: Model<OpeningMeasureDocument>,
  ) {}

  async create(createDto: CreateOpeningMeasureDto): Promise<OpeningMeasureDocument> {
    const createdMeasure = new this.openingMeasureModel({
      ...createDto,
      timestamp: createDto.timestamp || new Date(),
    });
    return createdMeasure.save();
  }

  async findAll(): Promise<OpeningMeasureDocument[]> {
    return this.openingMeasureModel.find().exec();
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

  async findOne(id: string): Promise<OpeningMeasureDocument> {
    const measure = await this.openingMeasureModel.findById(id).exec();
    if (!measure) {
      throw new NotFoundException(`OpeningMeasure with ID ${id} not found`);
    }
    return measure;
  }

  async remove(id: string): Promise<void> {
    const result = await this.openingMeasureModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`OpeningMeasure with ID ${id} not found`);
    }
  }
}
