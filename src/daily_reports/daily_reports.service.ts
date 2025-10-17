import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDailyReportDto } from './_utils/dto/request/create-daily-report.dto';
import { UpdateDailyReportDto } from './_utils/dto/request/update-daily-report.dto';
import { DailyReport, DailyReportDocument } from './daily_reports.schema';

@Injectable()
export class DailyReportsService {
  constructor(@InjectModel(DailyReport.name) private dailyReportModel: Model<DailyReportDocument>) {}

  async create(createDto: CreateDailyReportDto): Promise<DailyReportDocument> {
    const invalidWindows = createDto.openedWindowsDurations.filter(
      (window) => window.hotHouseId !== createDto.hotHouseId,
    );

    if (invalidWindows.length > 0) {
      throw new BadRequestException(
        `Tous les hotHouseId dans openedWindowsDurations doivent correspondre au hotHouseId du rapport (${createDto.hotHouseId})`,
      );
    }

    const createdReport = new this.dailyReportModel(createDto);
    return createdReport.save();
  }

  async findAll(): Promise<DailyReportDocument[]> {
    return this.dailyReportModel
      .find()
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

  async findByDate(date: string): Promise<DailyReportDocument[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return this.dailyReportModel
      .find({
        date: { $gte: startOfDay, $lte: endOfDay },
      })
      .populate('temperatureMeasurements')
      .populate('humidityMeasurements')
      .populate('predictionOfTheDay')
      .exec();
  }

  async findOne(id: string): Promise<DailyReportDocument> {
    const report = await this.dailyReportModel
      .findById(id)
      .populate('temperatureMeasurements')
      .populate('humidityMeasurements')
      .populate('predictionOfTheDay')
      .exec();
    if (!report) {
      throw new NotFoundException(`DailyReport with ID ${id} not found`);
    }
    return report;
  }

  // 🆕 Ajouter la méthode UPDATE
  async update(id: string, updateDto: UpdateDailyReportDto): Promise<DailyReportDocument> {
    if (updateDto.openedWindowsDurations) {
      const invalidWindows = updateDto.openedWindowsDurations.filter(
        (window) => window.hotHouseId !== updateDto.hotHouseId,
      );

      if (invalidWindows.length > 0) {
        throw new BadRequestException(
          `Tous les hotHouseId dans openedWindowsDurations doivent correspondre au hotHouseId du rapport (${updateDto.hotHouseId})`,
        );
      }
    }

    const updatedReport = await this.dailyReportModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .populate('temperatureMeasurements')
      .populate('humidityMeasurements')
      .populate('predictionOfTheDay')
      .exec();

    if (!updatedReport) {
      throw new NotFoundException(`DailyReport with ID ${id} not found`);
    }

    return updatedReport;
  }

  async remove(id: string): Promise<void> {
    const result = await this.dailyReportModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`DailyReport with ID ${id} not found`);
    }
  }
}
