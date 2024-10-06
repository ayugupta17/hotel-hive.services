import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import { Injectable } from '@nestjs/common';
import { Histogram } from 'prom-client';

// Define your custom metrics
const requestDurationHistogram = new Histogram({
  name: 'graphql_request_duration_seconds',
  help: 'Duration of GraphQL requests in seconds',
  labelNames: ['operationName', 'success'],
});

@Injectable()
export class ApolloPrometheusPlugin implements ApolloServerPlugin {
  requestDidStart = async (requestContext) => {
    const end = requestDurationHistogram.startTimer({
      operationName: requestContext.request.operationName,
    });

    return {
      willSendResponse: async ({ response }) => {
        const success = response.errors ? 'false' : 'true';
        end({ success });
      },
    };
  };
}
