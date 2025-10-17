import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import * as crypto from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FailedWebhook, FailedWebhookDocument } from './failed-webhook.schema';

@Injectable()
export class N8nService {
  private readonly logger = new Logger(N8nService.name);
  private readonly webhookUrl = process.env.N8N_WEBHOOK_URL!;
  private readonly secret = process.env.N8N_WEBHOOK_SECRET || 'change_me';

  constructor(@InjectModel(FailedWebhook.name) private failedWebhookModel: Model<FailedWebhookDocument>) {}

  triggerWorkflowFireAndForget(payload: any, opts?: { correlationId?: string; idempotencyKey?: string }) {
    const body = JSON.stringify(payload);
    const signature = crypto.createHmac('sha256', this.secret).update(body).digest('hex');

    const headers = {
      'Content-Type': 'application/json',
      'X-Hook-Signature': signature,
      'Idempotency-Key': opts?.idempotencyKey ?? payload.id ?? `id-${Date.now()}`,
      'X-Correlation-ID': opts?.correlationId ?? `cid-${Date.now()}`,
    };

    const axiosConfig: AxiosRequestConfig = {
      headers,
      timeout: 10000, // court timeout pour ne pas bloquer le worker
      maxBodyLength: Infinity,
    };

    // Important: DO NOT return the promise to caller — we handle it here.
    axios
      .post(this.webhookUrl, payload, axiosConfig)
      .then((response) => {
        this.logger.log(
          `n8n webhook accepted (status ${response.status}) — correlation=${headers['X-Correlation-ID']}`,
        );
        // Optionnel : stocker la réponse si besoin
      })
      .catch(async (err) => {
        this.logger.error(`n8n webhook failed — correlation=${headers['X-Correlation-ID']}`, err?.stack ?? err);
        // Sauvegarde pour retry / investigation (ex: collection Mongo)
        try {
          await this.failedWebhookModel.create({
            correlationId: headers['X-Correlation-ID'],
            idempotencyKey: headers['Idempotency-Key'],
            payload,
            error: err && err.message ? err.message : String(err),
            createdAt: new Date(),
          });
        } catch (saveErr) {
          this.logger.error('Failed to persist failed webhook', saveErr);
        }
      });

    // return nothing — fire-and-forget
  }
}
