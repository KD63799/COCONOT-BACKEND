import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HotHouse, HotHouseDocument } from './hothouses.schema';
import { CreateHotHouseDto } from './_utils/dto/request/create-hot-house.dto';
import { UpdateHotHouseDto } from './_utils/dto/request/update-hot-house.dto';

@Injectable()
export class HotHousesService {
  constructor(@InjectModel(HotHouse.name) private hotHouseModel: Model<HotHouseDocument>) {}

  async create(createHotHouseDto: CreateHotHouseDto): Promise<HotHouse> {
    const createdHotHouse = new this.hotHouseModel(createHotHouseDto);
    return createdHotHouse.save();
  }

  async findAll(): Promise<HotHouse[]> {
    return this.hotHouseModel.find().exec();
  }

  async findOne(id: string): Promise<HotHouse> {
    const hotHouse = await this.hotHouseModel.findById(id).exec();
    if (!hotHouse) {
      throw new NotFoundException(`HotHouse with ID ${id} not found`);
    }
    return hotHouse;
  }

  async update(id: string, updateHotHouseDto: UpdateHotHouseDto): Promise<HotHouse> {
    const updatedHotHouse = await this.hotHouseModel.findByIdAndUpdate(id, updateHotHouseDto, { new: true }).exec();
    if (!updatedHotHouse) {
      throw new NotFoundException(`HotHouse with ID ${id} not found`);
    }
    return updatedHotHouse;
  }

  async remove(id: string): Promise<void> {
    const result = await this.hotHouseModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`HotHouse with ID ${id} not found`);
    }
  }
}
