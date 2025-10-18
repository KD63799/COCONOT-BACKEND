import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { N8nService } from './n8n.service';

@Controller('reports')
export class N8nController {
  constructor(private readonly n8nService: N8nService) {}

  @Post('send/:date')
  async sendReports(@Body() body: any, @Res() res: Response) {
    const dateIso = body.date || new Date().toISOString().slice(0, 10); // ex: "2025-06-01"
    // Lancement fire-and-forget : NE PAS AWAITER
    this.n8nService.sendReportsForDateFireAndForget(dateIso, {
      correlationId: `manual-${Date.now()}`,
    });

    // Réponse immédiate à l'app iOS
    return res.status(202).json({ status: 'accepted', date: dateIso });
  }
}
