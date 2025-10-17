import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TemperatureMeasuresService } from './temperature-measures.service';
import { TemperatureMeasure, TemperatureMeasureSchema } from './temperature-measures.schema';
import { TemperatureMeasuresController } from './temperature_measures.controller';
import { TemperatureMeasuresRepository } from './temperature-measures.repository';
import { TemperatureMeasureMapper } from './temperature-measures.mapper';

@Module({
  imports: [MongooseModule.forFeature([{ name: TemperatureMeasure.name, schema: TemperatureMeasureSchema }])],
  controllers: [TemperatureMeasuresController],
  providers: [TemperatureMeasuresService, TemperatureMeasuresRepository, TemperatureMeasureMapper],
  exports: [TemperatureMeasuresService],
})
export class TemperatureMeasuresModule {}
