import { IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOpeningMeasureDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  @IsString()
  @IsNotEmpty()
  hotHouseId: string;

  @ApiProperty({ example: '08:30' })
  @IsString()
  @IsNotEmpty()
  openWindowTime: string;

  @ApiProperty({ example: '18:45' })
  @IsString()
  @IsNotEmpty()
  closeWindowTime: string;

  @ApiProperty({ example: '2025-10-16T10:30:00.000Z', required: false })
  @IsDateString()
  @IsOptional()
  timestamp?: Date;
}
