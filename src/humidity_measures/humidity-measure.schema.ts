import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type HumidityMeasureDocument = HydratedDocument<HumidityMeasure>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class HumidityMeasure {
  @Prop({ type: Types.ObjectId, ref: 'HotHouse', required: true })
  hotHouseId: Types.ObjectId;

  @Prop({ required: true })
  humidityMeasuredInsideHotHouse: number;

  @Prop({ required: true })
  humidityFromWeather: number;

  @Prop({ required: true, default: Date.now })
  timestamp: Date;

  createdAt: Date;
  updatedAt: Date;
}

export const HumidityMeasureSchema = SchemaFactory.createForClass(HumidityMeasure);
