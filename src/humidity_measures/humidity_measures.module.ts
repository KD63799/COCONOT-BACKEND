import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HumidityMeasure, HumidityMeasureSchema } from './humidity-measure.schema';
import { HumidityMeasuresController } from './humidity_measures.controller';
import { HumidityMeasuresService } from './humidity_measures.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: HumidityMeasure.name, schema: HumidityMeasureSchema }])],
  controllers: [HumidityMeasuresController],
  providers: [HumidityMeasuresService],
  exports: [HumidityMeasuresService],
})
export class HumidityMeasuresModule {}
