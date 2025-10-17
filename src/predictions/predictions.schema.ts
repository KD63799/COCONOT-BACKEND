import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PredictionDocument = HydratedDocument<Prediction>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Prediction {
  @Prop({ type: Types.ObjectId, ref: 'HotHouse', required: true })
  hotHouseId: Types.ObjectId;

  @Prop({
    type: [
      {
        _id: false,
        hotHouseId: { type: String, required: true },
        openWindowTime: { type: String, required: true },
        closeWindowTime: { type: String, required: true },
      },
    ],
    required: true,
  })
  openedWindowsDurationsPredicted: Array<{
    hotHouseId: string;
    openWindowTime: string;
    closeWindowTime: string;
  }>;

  @Prop({ required: true })
  predictionDate: Date;

  createdAt: Date;
  updatedAt: Date;
}

export const PredictionSchema = SchemaFactory.createForClass(Prediction);
