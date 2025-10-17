import { IsNotEmpty, IsNumber, IsString, Max, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { AddressDto } from '../../../../_utils/dto/adress.dto';
import { LocalisationGpsDto } from '../../../../_utils/dto/localisation-gps.dto';

export class CreateHotHouseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => LocalisationGpsDto)
  location: LocalisationGpsDto;

  @ApiProperty()
  @IsNumber()
  @Min(-50)
  @Max(100)
  temperatureThresholdMax: number;

  @ApiProperty()
  @IsNumber()
  @Min(-50)
  @Max(100)
  temperatureThresholdMin: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(100)
  humidityThresholdMax: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(100)
  humidityThresholdMin: number;
}
