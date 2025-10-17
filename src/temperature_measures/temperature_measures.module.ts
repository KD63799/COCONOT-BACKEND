import { Module, forwardRef } from '@nestjs/common'; // ✅ Importer forwardRef
import { MongooseModule } from '@nestjs/mongoose';
import { TemperatureMeasuresService } from './temperature-measures.service';
import { HotHousesModule } from '../hothouses/hothouses.module';
import { TemperatureMeasure, TemperatureMeasureSchema } from './temperature-measures.schema';
import { DailyReportsModule } from '../daily_reports/daily_reports.module';
import { TemperatureMeasuresController } from './temperature_measures.controller';
import { TemperatureMeasuresRepository } from './temperature-measures.repository';
import { TemperatureMeasureMapper } from './temperature-measures.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TemperatureMeasure.name, schema: TemperatureMeasureSchema }]),
    forwardRef(() => DailyReportsModule), // ✅ Utiliser forwardRef
    HotHousesModule,
  ],
  controllers: [TemperatureMeasuresController],
  providers: [TemperatureMeasuresService, TemperatureMeasuresRepository, TemperatureMeasureMapper],
  exports: [TemperatureMeasuresService],
})
export class TemperatureMeasuresModule {}
