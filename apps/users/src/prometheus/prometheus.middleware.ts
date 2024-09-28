import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as client from 'prom-client';

@Injectable()
export class PrometheusMiddleware implements NestMiddleware {
  private readonly requestCounter: client.Counter<string>;
  constructor() {
    this.requestCounter = new client.Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status'],
    });
    client.collectDefaultMetrics();
  }
  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      this.requestCounter
        .labels(req.method, req.route.path, res.statusCode.toString())
        .inc();
    });
    next();
  }
}
