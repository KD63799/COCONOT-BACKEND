import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OpeningMeasuresService } from './opening-measures.service';
import { OpeningMeasuresController } from './opening-measures.controller';
import { HotHousesModule } from '../hothouses/hothouses.module';
import { OpeningMeasure, OpeningMeasureSchema } from './opening-measures.schema';
import { DailyReportsModule } from '../daily_reports/daily_reports.module';
import { OpeningMeasuresRepository } from './opening-measures.repository';
import { OpeningMeasureMapper } from './opening-measures.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OpeningMeasure.name, schema: OpeningMeasureSchema }]),
    forwardRef(() => DailyReportsModule),
    HotHousesModule,
  ],
  controllers: [OpeningMeasuresController],
  providers: [OpeningMeasuresService, OpeningMeasuresRepository, OpeningMeasureMapper],
  exports: [OpeningMeasuresService],
})
export class OpeningMeasuresModule {}
