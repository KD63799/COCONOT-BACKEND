import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DailyReportDocument = DailyReport & Document;

@Schema({ timestamps: true })
export class DailyReport {
  @Prop({ type: Types.ObjectId, ref: 'HotHouse', required: true })
  hotHouseId: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'TemperatureMeasure', default: [] })
  temperatureMeasurements: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'HumidityMeasure', default: [] })
  humidityMeasurements: Types.ObjectId[];

  @Prop({
    type: [
      {
        hotHouseId: String,
        openWindowTime: String,
        closeWindowTime: String,
      },
    ],
    default: [],
  })
  openedWindowsDurations: Array<{
    hotHouseId?: string; // 🆕
    openWindowTime: string;
    closeWindowTime: string;
  }>;

  @Prop({ required: true, min: 0, max: 5 })
  rateOfTheDay: number;

  @Prop({ required: true })
  date: Date;

  @Prop({ type: Types.ObjectId, ref: 'Prediction', required: false })
  predictionOfTheDay?: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

export const DailyReportSchema = SchemaFactory.createForClass(DailyReport);
