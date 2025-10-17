import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HotHouseDocument = HydratedDocument<HotHouse>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class HotHouse {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Object, required: true })
  address: {
    addressStreet: string;
    postalCode: string;
    city: string;
  };

  @Prop({ type: Object, required: true })
  location: {
    latitude: number;
    longitude: number;
  };

  @Prop({ required: true })
  temperatureThresholdMax: number;

  @Prop({ required: true })
  temperatureThresholdMin: number;

  @Prop({ required: true })
  humidityThresholdMax: number;

  @Prop({ required: true })
  humidityThresholdMin: number;

  createdAt: Date;
  updatedAt: Date;
}

export const HotHouseSchema = SchemaFactory.createForClass(HotHouse);
