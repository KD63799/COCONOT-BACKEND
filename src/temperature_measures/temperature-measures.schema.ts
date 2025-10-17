import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TemperatureMeasureDocument = HydratedDocument<TemperatureMeasure>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class TemperatureMeasure {
  @Prop({ type: Types.ObjectId, ref: 'HotHouse', required: true })
  hotHouseId: Types.ObjectId;

  @Prop({ required: true })
  temperatureMeasuredInsideHotHouse: number;

  @Prop({ required: true })
  temperatureFromWeather: number;

  @Prop({ required: true, default: Date.now })
  timestamp: Date;

  createdAt: Date;
  updatedAt: Date;
}

export const TemperatureMeasureSchema = SchemaFactory.createForClass(TemperatureMeasure);
