import { PartialType } from '@nestjs/swagger';
import { CreateHotHouseDto } from './create-hot-house.dto';

export class UpdateHotHouseDto extends PartialType(CreateHotHouseDto) {}
