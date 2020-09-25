import {app} from './api/api-app';
import {logger} from './core/logging';

const port = process.env.PORT || 3000;
app.listen(port, () => {
    logger.info(`Ready on port ${port}`);
});
