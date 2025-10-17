import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DailyReport, DailyReportDocument } from './daily_reports.schema';

@Injectable()
export class DailyReportsRepository {
  constructor(@InjectModel(DailyReport.name) private readonly dailyReportModel: Model<DailyReport>) {}

  async create(data: Partial<DailyReport>): Promise<DailyReportDocument> {
    const created = new this.dailyReportModel(data);
    return created.save();
  }

  async findAll(): Promise<DailyReportDocument[]> {
    return this.dailyReportModel
      .find()
      .populate('temperatureMeasurements')
      .populate('humidityMeasurements')
      .populate('predictionOfTheDay')
      .exec();
  }

  async findById(id: string): Promise<DailyReportDocument | null> {
    return this.dailyReportModel
      .findById(id)
      .populate('temperatureMeasurements')
      .populate('humidityMeasurements')
      .populate('predictionOfTheDay')
      .exec();
  }

  async findByHotHouseId(hotHouseId: string): Promise<DailyReportDocument[]> {
    return this.dailyReportModel
      .find({ hotHouseId })
      .populate('temperatureMeasurements')
      .populate('humidityMeasurements')
      .populate('predictionOfTheDay')
      .sort({ date: -1 })
      .exec();
  }

  async findByHotHouseIdAndDate(
    hotHouseId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<DailyReportDocument | null> {
    return this.dailyReportModel
      .findOne({
        hotHouseId,
        date: { $gte: startDate, $lte: endDate },
      })
      .exec();
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<DailyReportDocument[]> {
    return this.dailyReportModel
      .find({
        date: { $gte: startDate, $lte: endDate },
      })
      .populate('temperatureMeasurements')
      .populate('humidityMeasurements')
      .populate('predictionOfTheDay')
      .exec();
  }

  async update(id: string, data: Partial<DailyReport>): Promise<DailyReportDocument | null> {
    return this.dailyReportModel
      .findByIdAndUpdate(id, data, { new: true })
      .populate('temperatureMeasurements')
      .populate('humidityMeasurements')
      .populate('predictionOfTheDay')
      .exec();
  }

  async addTemperatureMeasure(reportId: string, measureId: string): Promise<DailyReportDocument | null> {
    return this.dailyReportModel
      .findByIdAndUpdate(reportId, { $addToSet: { temperatureMeasurements: measureId } }, { new: true })
      .populate('temperatureMeasurements')
      .populate('humidityMeasurements')
      .populate('predictionOfTheDay')
      .exec();
  }

  async addHumidityMeasure(reportId: string, measureId: string): Promise<DailyReportDocument | null> {
    return this.dailyReportModel
      .findByIdAndUpdate(reportId, { $addToSet: { humidityMeasurements: measureId } }, { new: true })
      .populate('temperatureMeasurements')
      .populate('humidityMeasurements')
      .populate('predictionOfTheDay')
      .exec();
  }

  async addOpenedWindow(
    reportId: string,
    window: { hotHouseId: string; openWindowTime: string; closeWindowTime: string },
  ): Promise<DailyReportDocument | null> {
    return this.dailyReportModel
      .findByIdAndUpdate(reportId, { $push: { openedWindowsDurations: window } }, { new: true })
      .populate('temperatureMeasurements')
      .populate('humidityMeasurements')
      .populate('predictionOfTheDay')
      .exec();
  }

  async delete(id: string): Promise<DailyReportDocument | null> {
    return this.dailyReportModel.findByIdAndDelete(id).exec();
  }
}
