import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DailyReport, DailyReportSchema } from './daily_reports.schema';
import { DailyReportsController } from './daily_reports.controller';
import { DailyReportsService } from './daily_reports.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: DailyReport.name, schema: DailyReportSchema }])],
  controllers: [DailyReportsController],
  providers: [DailyReportsService],
  exports: [DailyReportsService],
})
export class DailyReportsModule {}
