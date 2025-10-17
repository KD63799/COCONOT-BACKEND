import { ApiProperty } from '@nestjs/swagger';

export class OpeningMeasureResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  hotHouseId: string;

  @ApiProperty()
  openWindowTime: string;

  @ApiProperty()
  closeWindowTime: string;

  @ApiProperty()
  timestamp: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
