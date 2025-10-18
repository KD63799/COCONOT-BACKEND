import { Injectable } from '@nestjs/common';
import { DailyReport, DailyReportDocument } from './daily_reports.schema';
import { DailyReportResponseDto } from './_utils/dto/response/get-daily-report-response.dto';
import { CreateDailyReportDto } from './_utils/dto/request/create-daily-report.dto';
import { GetTemperatureMeasureResponseDto } from '../temperature_measures/_utils/dto/response/get-temperature-measure-response.dto';
import { GetHumidityMeasureResponseDto } from '../humidity_measures/_utils/dto/response/get-humidity-measure-response.dto';

@Injectable()
export class DailyReportMapper {
  toResponseDto(doc: DailyReportDocument): DailyReportResponseDto {
    return {
      id: doc.id,
      hotHouseId: doc.hotHouseId.toString(),
      hotHouseName: doc.hotHouseName,
      isSubmitted: doc.isSubmitted,

      temperatureMeasurements: doc.temperatureMeasurements.map((m: any) => {
        if (m && typeof m === 'object' && m.temperatureMeasuredInsideHotHouse !== undefined) {
          return {
            id: m._id?.toString() || m.id,
            hotHouseId: m.hotHouseId?.toString() || '',
            temperatureMeasuredInsideHotHouse: m.temperatureMeasuredInsideHotHouse,
            temperatureFromWeather: m.temperatureFromWeather,
            timestamp: m.timestamp,
            createdAt: m.createdAt,
            updatedAt: m.updatedAt,
          } as GetTemperatureMeasureResponseDto;
        }
        return typeof m === 'string' ? m : m._id?.toString() || m.id;
      }),

      humidityMeasurements: doc.humidityMeasurements.map((m: any) => {
        if (m && typeof m === 'object' && m.humidityMeasuredInsideHotHouse !== undefined) {
          return {
            id: m._id?.toString() || m.id,
            hotHouseId: m.hotHouseId?.toString() || '',
            humidityMeasuredInsideHotHouse: m.humidityMeasuredInsideHotHouse,
            humidityFromWeather: m.humidityFromWeather,
            timestamp: m.timestamp,
            createdAt: m.createdAt,
            updatedAt: m.updatedAt,
          } as GetHumidityMeasureResponseDto;
        }
        return typeof m === 'string' ? m : m._id?.toString() || m.id;
      }),

      openedWindowsDurations: doc.openedWindowsDurations,
      rateOfTheDay: doc.rateOfTheDay,
      date: doc.date,
      predictionOfTheDay: doc.predictionOfTheDay?.toString(),
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  toResponseDtoArray(docs: DailyReportDocument[]): DailyReportResponseDto[] {
    return docs.map((doc) => this.toResponseDto(doc));
  }

  toEntity(createDto: CreateDailyReportDto): Partial<DailyReport> {
    return {
      hotHouseId: createDto.hotHouseId as any,
      hotHouseName: createDto.hotHouseName,
      isSubmitted: createDto.isSubmitted || false,
      temperatureMeasurements: createDto.temperatureMeasurements as any,
      humidityMeasurements: createDto.humidityMeasurements as any,
      openedWindowsDurations: createDto.openedWindowsDurations,
      rateOfTheDay: createDto.rateOfTheDay,
      date: createDto.date,
      predictionOfTheDay: createDto.predictionOfTheDay as any,
    };
  }
}
