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

  constructor(
    // injection optionnelle : retire si tu ne veux/peux pas persister les échecs
    @InjectModel(FailedWebhook.name) private failedWebhookModel?: Model<FailedWebhookDocument>,
  ) {}

  /**
   * Récupère les données à envoyer à n8n.
   * Remplace l'implémentation par ton propre appel DB / service.
   */
  private async fetchReportsForDate(dateIso: string): Promise<any[]> {
    // Exemple : appeler ton service / repo
    // return this.reportsService.findByDate(dateIso);
    // Pour l'exemple, retourne un tableau vide (à remplacer)
    return [];
  }

  /**
   * Envoie les rapports pour la date donnée vers n8n en fire-and-forget.
   * IMPORTANT: la méthode ne doit PAS être awaitée par le caller (controller) pour éviter de bloquer l'iOS.
   */
  sendReportsForDateFireAndForget(dateIso: string, opts?: { correlationId?: string }) {
    // 1) récupérer les données (on peut await ici car c'est local, mais on n'attend pas l'appel HTTP)
    this.fetchReportsForDate(dateIso)
      .then((reports) => {
        if (!reports || reports.length === 0) {
          this.logger.log(`Aucun rapport à envoyer pour ${dateIso}`);
          return;
        }

        const payload = reports; // selon ton format (ta sample JSON était un array root)
        const bodyString = JSON.stringify(payload);
        const signature = crypto.createHmac('sha256', this.secret).update(bodyString).digest('hex');

        const idempotencyKey = `reports-${dateIso}`;
        const correlationId = opts?.correlationId ?? `reports-${dateIso}-${Date.now()}`;

        const headers = {
          'Content-Type': 'application/json',
          'X-Hook-Signature': signature,
          'Idempotency-Key': idempotencyKey,
          'X-Correlation-ID': correlationId,
        };

        const axiosConfig: AxiosRequestConfig = {
          headers,
          timeout: 5000, // court timeout pour ne pas bloquer trop longtemps
          maxBodyLength: Infinity,
        };

        // Fire-and-forget: on ne retourne pas la promesse au caller
        axios
          .post(this.webhookUrl, payload, axiosConfig)
          .then((res) => {
            this.logger.log(`n8n webhook success status=${res.status} correlation=${correlationId}`);
          })
          .catch(async (err) => {
            const errMsg = err?.response?.data ?? err?.message ?? String(err);
            this.logger.error(`n8n webhook failed correlation=${correlationId} error=${errMsg}`);

            // Optionnel : persister l'échec pour retry plus tard si model injecté
            if (this.failedWebhookModel) {
              try {
                await this.failedWebhookModel.create({
                  correlationId,
                  idempotencyKey,
                  payload,
                  error: typeof errMsg === 'string' ? errMsg : JSON.stringify(errMsg),
                  retries: 0,
                });
                this.logger.log(`Failed webhook persisted correlation=${correlationId}`);
              } catch (saveErr) {
                this.logger.error('Failed to persist failed webhook', saveErr);
              }
            }
          });
      })
      .catch((fetchErr) => {
        // Erreur lors de la récupération des rapports
        this.logger.error('Failed to fetch reports for date', fetchErr);
      });

    // NOTA: on ne renvoie rien pour signaler au caller; caller renvoie déjà la réponse HTTP.
  }
}
