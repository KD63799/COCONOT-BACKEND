import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';

import { CreateDailyReportDto } from './_utils/dto/request/create-daily-report.dto';
import { UpdateDailyReportDto } from './_utils/dto/request/update-daily-report.dto';
import { DailyReportResponseDto } from './_utils/dto/response/get-daily-report-response.dto';
import { DailyReportsRepository } from './daily_reports.repository';
import { DailyReportMapper } from './daily-reports.mapper';
import { DailyReport } from './daily_reports.schema';

@Injectable()
export class DailyReportsService {
  constructor(
    private readonly repository: DailyReportsRepository,
    private readonly mapper: DailyReportMapper,
  ) {}

  async create(createDto: CreateDailyReportDto): Promise<DailyReportResponseDto> {
    const invalidWindows = createDto.openedWindowsDurations.filter(
      (window) => window.hotHouseId !== createDto.hotHouseId,
    );

    if (invalidWindows.length > 0) {
      throw new BadRequestException(
        `Tous les hotHouseId dans openedWindowsDurations doivent correspondre au hotHouseId du rapport (${createDto.hotHouseId})`,
      );
    }

    const entity = this.mapper.toEntity(createDto);
    const created = await this.repository.create(entity);
    return this.mapper.toResponseDto(created);
  }

  async findOrCreateDailyReport(hotHouseId: string, hotHouseName: string, date: Date): Promise<DailyReportResponseDto> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const existing = await this.repository.findByHotHouseIdAndDate(hotHouseId, startOfDay, endOfDay);

    if (existing) {
      return this.mapper.toResponseDto(existing);
    }

    const newReport: CreateDailyReportDto = {
      hotHouseId,
      hotHouseName,
      isSubmitted: false,
      temperatureMeasurements: [],
      humidityMeasurements: [],
      openedWindowsDurations: [],
      rateOfTheDay: 0,
      date: startOfDay,
    };

    return this.create(newReport);
  }

  async addTemperatureMeasure(
    hotHouseId: string,
    hotHouseName: string,
    measureId: string,
    date: Date,
  ): Promise<DailyReportResponseDto> {
    const report = await this.findOrCreateDailyReport(hotHouseId, hotHouseName, date);

    const alreadyExists = report.temperatureMeasurements.some((m) => {
      if (typeof m === 'string') {
        return m === measureId;
      }
      return m.id === measureId;
    });

    if (alreadyExists) {
      return report;
    }

    const updated = await this.repository.addTemperatureMeasure(report.id, measureId);
    if (!updated) {
      throw new NotFoundException(`DailyReport with ID ${report.id} not found`);
    }
    return this.mapper.toResponseDto(updated);
  }

  async addHumidityMeasure(
    hotHouseId: string,
    hotHouseName: string,
    measureId: string,
    date: Date,
  ): Promise<DailyReportResponseDto> {
    const report = await this.findOrCreateDailyReport(hotHouseId, hotHouseName, date);

    const alreadyExists = report.humidityMeasurements.some((m) => {
      if (typeof m === 'string') {
        return m === measureId;
      }
      return m.id === measureId;
    });

    if (alreadyExists) {
      return report;
    }

    const updated = await this.repository.addHumidityMeasure(report.id, measureId);
    if (!updated) {
      throw new NotFoundException(`DailyReport with ID ${report.id} not found`);
    }
    return this.mapper.toResponseDto(updated);
  }

  async addOpenedWindow(
    hotHouseId: string,
    hotHouseName: string,
    openWindowTime: string,
    closeWindowTime: string,
    date: Date,
  ): Promise<DailyReportResponseDto> {
    const report = await this.findOrCreateDailyReport(hotHouseId, hotHouseName, date);

    const updated = await this.repository.addOpenedWindow(report.id, {
      hotHouseId,
      openWindowTime,
      closeWindowTime,
    });

    if (!updated) {
      throw new NotFoundException(`DailyReport with ID ${report.id} not found`);
    }
    return this.mapper.toResponseDto(updated);
  }

  async findAll(): Promise<DailyReportResponseDto[]> {
    const docs = await this.repository.findAll();
    return this.mapper.toResponseDtoArray(docs);
  }

  async findByHotHouseId(hotHouseId: string): Promise<DailyReportResponseDto[]> {
    const docs = await this.repository.findByHotHouseId(hotHouseId);
    return this.mapper.toResponseDtoArray(docs);
  }

  async findByDate(date: string): Promise<DailyReportResponseDto[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const docs = await this.repository.findByDateRange(startOfDay, endOfDay);
    return this.mapper.toResponseDtoArray(docs);
  }

  async findOne(id: string): Promise<DailyReportResponseDto> {
    const doc = await this.repository.findById(id);
    if (!doc) {
      throw new NotFoundException(`DailyReport with ID ${id} not found`);
    }
    return this.mapper.toResponseDto(doc);
  }

  async update(id: string, updateDto: UpdateDailyReportDto): Promise<DailyReportResponseDto> {
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

    const updateData: Partial<DailyReport> = {
      ...(updateDto.hotHouseName && { hotHouseName: updateDto.hotHouseName }),
      ...(updateDto.isSubmitted !== undefined && { isSubmitted: updateDto.isSubmitted }),
      ...(updateDto.temperatureMeasurements && {
        temperatureMeasurements: updateDto.temperatureMeasurements as any,
      }),
      ...(updateDto.humidityMeasurements && {
        humidityMeasurements: updateDto.humidityMeasurements as any,
      }),
      ...(updateDto.openedWindowsDurations && {
        openedWindowsDurations: updateDto.openedWindowsDurations,
      }),
      ...(updateDto.rateOfTheDay !== undefined && { rateOfTheDay: updateDto.rateOfTheDay }),
      ...(updateDto.date && { date: updateDto.date }),
      ...(updateDto.predictionOfTheDay && {
        predictionOfTheDay: updateDto.predictionOfTheDay as any,
      }),
    };

    const updated = await this.repository.update(id, updateData);

    if (!updated) {
      throw new NotFoundException(`DailyReport with ID ${id} not found`);
    }

    return this.mapper.toResponseDto(updated);
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`DailyReport with ID ${id} not found`);
    }
  }
}
