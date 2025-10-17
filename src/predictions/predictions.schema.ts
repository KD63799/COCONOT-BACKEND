import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PredictionDocument = Prediction & Document;

@Schema({ timestamps: true })
export class Prediction {
  @Prop({ type: Types.ObjectId, ref: 'HotHouse', required: true })
  hotHouseId: Types.ObjectId;

  @Prop({
    type: [
      {
        openWindowTime: String,
        closeWindowTime: String,
      },
    ],
    required: true,
  })
  openedWindowsDurationsPredicted: Array<{
    openWindowTime: string;
    closeWindowTime: string;
  }>;

  @Prop({ required: true })
  predictionDate: Date;
}

export const PredictionSchema = SchemaFactory.createForClass(Prediction);
