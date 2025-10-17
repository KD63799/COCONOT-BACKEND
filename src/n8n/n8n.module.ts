import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { N8nService } from './n8n.service';
import { N8nController } from './n8n.controller';
import { FailedWebhook, FailedWebhookSchema } from './failed-webhook.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: FailedWebhook.name, schema: FailedWebhookSchema }])],
  controllers: [N8nController],
  providers: [N8nService],
  exports: [N8nService],
})
export class N8nModule {}
