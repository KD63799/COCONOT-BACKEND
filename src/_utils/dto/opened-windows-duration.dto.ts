import { IsString } from 'class-validator';

export class OpenedWindowsDurationDto {
  @IsString()
  openWindowTime: string; // Format: "HH:mm" ou ISO

  @IsString()
  closeWindowTime: string; // Format: "HH:mm" ou ISO
}
