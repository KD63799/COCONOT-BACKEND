import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DailyReport, DailyReportSchema } from './daily_reports.schema';
import { DailyReportsController } from './daily_reports.controller';
import { DailyReportsService } from './daily_reports.service';
import { DailyReportsRepository } from './daily_reports.repository';
import { DailyReportMapper } from './daily-reports.mapper';

@Module({
  imports: [MongooseModule.forFeature([{ name: DailyReport.name, schema: DailyReportSchema }])],
  controllers: [DailyReportsController],
  providers: [DailyReportsService, DailyReportsRepository, DailyReportMapper],
  exports: [DailyReportsService],
})
export class DailyReportsModule {}
