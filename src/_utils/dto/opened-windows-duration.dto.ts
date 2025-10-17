import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OpenedWindowsDurationDto {
  @ApiProperty({ example: '68f200bc4b295453ea1bdfa6', required: false })
  @IsString()
  @IsOptional()
  hotHouseId?: string;

  @ApiProperty({ example: '08:30', description: "Heure d'ouverture (format HH:mm)" })
  @IsString()
  @IsNotEmpty()
  openWindowTime: string;

  @ApiProperty({ example: '18:45', description: 'Heure de fermeture (format HH:mm)' })
  @IsString()
  @IsNotEmpty()
  closeWindowTime: string;
}
