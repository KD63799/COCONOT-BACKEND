import { IsNotEmpty, IsNumber, IsString, Max, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateHotHouseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @ValidateNested()
  @Type(() => LocalisationGpsDto)
  location: LocalisationGpsDto;

  @IsNumber()
  @Min(-50)
  @Max(100)
  temperatureThresholdMax: number;

  @IsNumber()
  @Min(-50)
  @Max(100)
  temperatureThresholdMin: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  humidityThresholdMax: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  humidityThresholdMin: number;
}

export class AddressDto {
  @IsString()
  addressStreet: string;

  @IsString()
  postalCode: string;

  @IsString()
  city: string;
}

export class LocalisationGpsDto {
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;
}
