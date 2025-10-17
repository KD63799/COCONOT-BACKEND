import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type HumidityMeasureDocument = HumidityMeasure & Document;

@Schema({ timestamps: true })
export class HumidityMeasure {
  @Prop({ type: Types.ObjectId, ref: 'HotHouse', required: true })
  hotHouseId: Types.ObjectId;

  @Prop({ required: true })
  humidityMeasuredInsideHotHouse: number;

  @Prop({ required: true })
  humidityFromWeather: number;

  @Prop({ required: true, default: Date.now })
  timestamp: Date;
}

export const HumidityMeasureSchema = SchemaFactory.createForClass(HumidityMeasure);
