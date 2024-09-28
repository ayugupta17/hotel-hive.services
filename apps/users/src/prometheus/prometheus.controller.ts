import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { register } from 'prom-client';

@Controller('metrics')
export class PrometheusController {
  @Get()
  async getMetrics(@Res() response: Response) {
    response.set('Content-Type', register.contentType);
    response.end(await register.metrics());
  }
}
