import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotHousesService } from './hothouses.service';
import { HotHousesController } from './hothouses.controller';
import { PredictionsModule } from '../predictions/predictions.module';
import { HotHouse, HotHouseSchema } from './hothouses.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: HotHouse.name, schema: HotHouseSchema }]), PredictionsModule],
  controllers: [HotHousesController],
  providers: [HotHousesService],
  exports: [HotHousesService],
})
export class HotHousesModule {}
