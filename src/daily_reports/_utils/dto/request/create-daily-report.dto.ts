import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsInt,
  Min,
  Max,
  IsDateString,
  ValidateNested,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { OpenedWindowsDurationDto } from '../../../../_utils/dto/opened-windows-duration.dto';

export class CreateDailyReportDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  @IsString()
  @IsNotEmpty()
  hotHouseId: string;

  @ApiProperty({ example: 'Serre à fraises' }) // 🆕
  @IsString()
  @IsNotEmpty()
  hotHouseName: string;

  @ApiProperty({ example: false, default: false }) // 🆕
  @IsBoolean()
  @IsOptional()
  isSubmitted?: boolean;

  @ApiProperty({ example: ['507f191e810c19729de860ea'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  temperatureMeasurements?: string[];

  @ApiProperty({ example: ['507f191e810c19729de860eb'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  humidityMeasurements?: string[];

  @ApiProperty({ type: [OpenedWindowsDurationDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OpenedWindowsDurationDto)
  openedWindowsDurations: OpenedWindowsDurationDto[];

  @ApiProperty({ example: 4, minimum: 0, maximum: 5 })
  @IsInt()
  @Min(0)
  @Max(5)
  rateOfTheDay: number;

  @ApiProperty({ example: '2025-10-16T00:00:00.000Z' })
  @IsDateString()
  date: Date;

  @ApiProperty({ example: '507f191e810c19729de860ec', required: false })
  @IsString()
  @IsOptional()
  predictionOfTheDay?: string;
}
