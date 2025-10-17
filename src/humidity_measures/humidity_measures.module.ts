import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HumidityMeasure, HumidityMeasureSchema } from './humidity-measure.schema';
import { HumidityMeasuresController } from './humidity_measures.controller';
import { HumidityMeasuresService } from './humidity_measures.service';
import { HumidityMeasuresRepository } from './humidity-measures.repository';
import { HumidityMeasureMapper } from './humidityMeasure.mapper';

@Module({
  imports: [MongooseModule.forFeature([{ name: HumidityMeasure.name, schema: HumidityMeasureSchema }])],
  controllers: [HumidityMeasuresController],
  providers: [HumidityMeasuresService, HumidityMeasuresRepository, HumidityMeasureMapper],
  exports: [HumidityMeasuresService],
})
export class HumidityMeasuresModule {}
