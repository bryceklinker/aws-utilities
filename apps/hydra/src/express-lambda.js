import awsServerless from 'aws-serverless-express';
import awsServerlessMiddleware from 'aws-serverless-express/middleware';
import {app} from './api/api-app';
import {logger} from './core/logging';

app.use(awsServerlessMiddleware.eventContext());

const server = awsServerless.createServer(app, null, {});

export function handler(event, context) {
    logger.info('Received event', {event, context});
    return awsServerless.proxy(server, event, context);
}
