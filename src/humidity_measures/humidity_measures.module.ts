import { Module } from '@nestjs/common';
import { TemperatureMeasuresModule } from '../temperature_measures/temperature_measures.module';

@Module({
  imports: [TemperatureMeasuresModule],
})
export class DailyReportsModule {}
