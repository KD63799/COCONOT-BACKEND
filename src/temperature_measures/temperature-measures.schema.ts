import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TemperatureMeasureDocument = TemperatureMeasure & Document;

@Schema({ timestamps: true })
export class TemperatureMeasure {
  @Prop({ type: Types.ObjectId, ref: 'HotHouse', required: true })
  hotHouseId: Types.ObjectId;

  @Prop({ required: true })
  temperatureMeasuredInsideHotHouse: number;

  @Prop({ required: true })
  temperatureFromWeather: number;

  @Prop({ required: true, default: Date.now })
  timestamp: Date;
}

export const TemperatureMeasureSchema = SchemaFactory.createForClass(TemperatureMeasure);
