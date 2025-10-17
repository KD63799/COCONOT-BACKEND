import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FailedWebhookDocument = FailedWebhook & Document;

@Schema({ timestamps: true })
export class FailedWebhook {
  @Prop({ required: true })
  correlationId: string;

  @Prop({ required: true })
  idempotencyKey: string;

  @Prop({ type: Object, required: true })
  payload: Record<string, any>;

  @Prop({ required: true })
  error: string;

  @Prop({ default: 0 })
  retries: number;

  @Prop()
  lastErrorAt?: Date;
}

export const FailedWebhookSchema = SchemaFactory.createForClass(FailedWebhook);
