import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type OpeningMeasureDocument = HydratedDocument<OpeningMeasure>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class OpeningMeasure {
  @Prop({ type: Types.ObjectId, ref: 'HotHouse', required: true })
  hotHouseId: Types.ObjectId;

  @Prop({ required: true })
  openWindowTime: string;

  @Prop({ required: true })
  closeWindowTime: string;

  @Prop({ required: true, default: Date.now })
  timestamp: Date;

  createdAt: Date;
  updatedAt: Date;
}

export const OpeningMeasureSchema = SchemaFactory.createForClass(OpeningMeasure);
