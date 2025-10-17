import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTemperatureMeasureDto } from './_utils/dto/request/create-temperature-measure.dto';
import { TemperatureMeasure, TemperatureMeasureDocument } from './temperature-measures.schema';

@Injectable()
export class TemperatureMeasuresService {
  constructor(
    @InjectModel(TemperatureMeasure.name)
    private temperatureMeasureModel: Model<TemperatureMeasureDocument>,
  ) {}

  async create(createDto: CreateTemperatureMeasureDto): Promise<TemperatureMeasure> {
    const createdMeasure = new this.temperatureMeasureModel({
      ...createDto,
      timestamp: createDto.timestamp || new Date(),
    });
    return createdMeasure.save();
  }

  async findAll(): Promise<TemperatureMeasure[]> {
    return this.temperatureMeasureModel.find().exec();
  }

  async findByHotHouseId(hotHouseId: string): Promise<TemperatureMeasure[]> {
    return this.temperatureMeasureModel.find({ hotHouseId }).sort({ timestamp: -1 }).exec();
  }

  async findByHotHouseIdAndDateRange(
    hotHouseId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<TemperatureMeasure[]> {
    return this.temperatureMeasureModel
      .find({
        hotHouseId,
        timestamp: { $gte: startDate, $lte: endDate },
      })
      .sort({ timestamp: 1 })
      .exec();
  }

  async findOne(id: string): Promise<TemperatureMeasure> {
    const measure = await this.temperatureMeasureModel.findById(id).exec();
    if (!measure) {
      throw new NotFoundException(`TemperatureMeasure with ID ${id} not found`);
    }
    return measure;
  }

  async remove(id: string): Promise<void> {
    const result = await this.temperatureMeasureModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`TemperatureMeasure with ID ${id} not found`);
    }
  }
}
