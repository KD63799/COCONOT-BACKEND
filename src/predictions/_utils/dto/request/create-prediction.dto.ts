import { IsString, IsNotEmpty, IsArray, IsDateString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { OpenedWindowsDurationDto } from '../../../../_utils/dto/opened-windows-duration.dto';

export class CreatePredictionDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  @IsString()
  @IsNotEmpty()
  hotHouseId: string;

  @ApiProperty({ type: [OpenedWindowsDurationDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OpenedWindowsDurationDto)
  openedWindowsDurationsPredicted: OpenedWindowsDurationDto[];

  @ApiProperty({ example: '2025-10-17T00:00:00.000Z' })
  @IsDateString()
  predictionDate: Date;
}
