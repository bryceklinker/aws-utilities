import {logger} from './core/logging';

export async function handler(event, context) {
    return new Promise((resolve) => {
        logger.info('Received message', {event, context});
    })
}
