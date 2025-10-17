import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotHousesModule } from '../hothouses/hothouses.module';
import { HumidityMeasure, HumidityMeasureSchema } from './humidity-measure.schema';
import { DailyReportsModule } from '../daily_reports/daily_reports.module';
import { HumidityMeasuresController } from './humidity_measures.controller';
import { HumidityMeasuresService } from './humidity_measures.service';
import { HumidityMeasuresRepository } from './humidity-measures.repository';
import { HumidityMeasureMapper } from './humidityMeasure.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: HumidityMeasure.name, schema: HumidityMeasureSchema }]),
    forwardRef(() => DailyReportsModule), // ✅ Utiliser forwardRef
    HotHousesModule,
  ],
  controllers: [HumidityMeasuresController],
  providers: [HumidityMeasuresService, HumidityMeasuresRepository, HumidityMeasureMapper],
  exports: [HumidityMeasuresService],
})
export class HumidityMeasuresModule {}
