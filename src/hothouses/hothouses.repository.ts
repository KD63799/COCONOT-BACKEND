import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HotHouse, HotHouseDocument } from './hothouses.schema';

@Injectable()
export class HotHousesRepository {
  constructor(@InjectModel(HotHouse.name) private readonly hotHouseModel: Model<HotHouse>) {}

  async create(data: Partial<HotHouse>): Promise<HotHouseDocument> {
    const created = new this.hotHouseModel(data);
    return created.save();
  }

  async findAll(): Promise<HotHouseDocument[]> {
    return this.hotHouseModel.find().exec();
  }

  async findById(id: string): Promise<HotHouseDocument | null> {
    return this.hotHouseModel.findById(id).exec();
  }

  async update(id: string, data: Partial<HotHouse>): Promise<HotHouseDocument | null> {
    return this.hotHouseModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<HotHouseDocument | null> {
    return this.hotHouseModel.findByIdAndDelete(id).exec();
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.hotHouseModel.countDocuments({ _id: id }).exec();
    return count > 0;
  }
}
