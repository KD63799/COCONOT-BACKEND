import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { N8nService } from './n8n.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('orders')
export class N8nController {
  constructor(private readonly n8nService: N8nService) {}

  @Post()
  async createOrder(@Body() dto: any, @Res() res: Response) {
    // 1) crée en DB (exemple minimal)
    const orderId = uuidv4(); // remplace par la vraie création DB
    const order = { id: orderId, ...dto, status: 'created' };
    console.log(order);
    // saveOrder(order) ...

    // 2) prépare payload pour n8n
    const payload = { orderId: order.id, userId: dto.userId, total: dto.total };

    // 3) déclenche en background (NE PAS await)
    this.n8nService.triggerWorkflowFireAndForget(payload, {
      correlationId: `order-${orderId}`,
      idempotencyKey: `order-${orderId}`,
    });

    // 4) répond immédiatement au client iOS
    return res.status(201).json({ id: orderId, status: 'created' });
  }
}
