import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TemperatureMeasuresService } from './temperature_measures.service';
import { TemperatureMeasuresController } from './temperature_measures.controller';
import { TemperatureMeasure, TemperatureMeasureSchema } from './temperature-measures.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: TemperatureMeasure.name, schema: TemperatureMeasureSchema }])],
  controllers: [TemperatureMeasuresController],
  providers: [TemperatureMeasuresService],
  exports: [TemperatureMeasuresService],
})
export class TemperatureMeasuresModule {}
