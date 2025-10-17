import { IsString, IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTemperatureMeasureDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  @IsString()
  @IsNotEmpty()
  hotHouseId: string;

  @ApiProperty({ example: 24.5 })
  @IsNumber()
  temperatureMeasuredInsideHotHouse: number;

  @ApiProperty({ example: 18.3 })
  @IsNumber()
  temperatureFromWeather: number;

  @ApiProperty({ example: '2025-10-16T10:30:00.000Z', required: false })
  @IsDateString()
  @IsOptional()
  timestamp?: Date;
}
